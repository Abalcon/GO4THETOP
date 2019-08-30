package com.stulti.go4thetop;

import org.bytedeco.javacpp.Loader;
import org.bytedeco.opencv.opencv_java;
import org.opencv.calib3d.Calib3d;
import org.opencv.core.*;
import org.opencv.features2d.DescriptorMatcher;
import org.opencv.features2d.Features2d;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.xfeatures2d.SURF;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

/*
 * https://github.com/juleswhite/mobile-cloud-asgn1/blob/master/src/main/java/org/magnum/dataup/VideoFileManager.java
 */
@Component
public class ImageRecognitionServiceImpl implements ImageRecognitionService {
    private Path targetDir = Paths.get("preliminaryRecords");

    private Path getImagePath(String imgPath) {
        assert (imgPath != null);
        // 이미지 이름 중복 방지
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        return targetDir.resolve(ts.getTime() + "_" + imgPath);
    }

    //private TessBaseAPI tessAPI = new TessBaseAPI();
    //private Net txtDetectNet;

    private AWSRekognitionService awsRekognitionService;

    private ImageRecognitionServiceImpl(AWSRekognitionService awsRekognitionService) throws IOException {
        if (!Files.exists(targetDir)) {
            Files.createDirectories(targetDir);
        }

        //tessAPI.Init(targetDir.toString(), "eng");
        // OpenCV로 텍스트가 있는 곳을 먼저 인식 - Model 불러오기
        Loader.load(opencv_java.class);
        //txtDetectNet = Dnn.readNetFromTensorflow(targetDir + "/frozen_east_text_detection.pb");

        this.awsRekognitionService = awsRekognitionService;
    }


    public String recognizeImageData(String imgPath, InputStream imageData, String division) throws IOException {
        assert (imageData != null);
        // Save the input image
        Path target = getImagePath(imgPath);
        Files.copy(imageData, target, StandardCopyOption.REPLACE_EXISTING);

        // Load Score Template
        String scoreTmpFileName = targetDir + "/ScoreTemplate.jpg";
        Mat ScoreTemplate = Imgcodecs.imread(scoreTmpFileName);
        Imgproc.cvtColor(ScoreTemplate, ScoreTemplate, Imgproc.COLOR_RGB2GRAY);
        // for eA-App images
        String scoreTmpAppFileName = targetDir + "/ScoreTemplateApp.jpg";
        Mat ScoreAppTemplate = Imgcodecs.imread(scoreTmpAppFileName);
        Imgproc.cvtColor(ScoreAppTemplate, ScoreAppTemplate, Imgproc.COLOR_RGB2GRAY);

        // Load Music Validation Template - 예선 지정곡 4곡 적용
        String music1, music2;
        Mat musicTemplate1, musicTemplate2;
        switch (division) {
            case "lower":
                music1 = targetDir + "/MusicLowerPic1-1.jpeg";
                musicTemplate1 = Imgcodecs.imread(music1);
                Imgproc.cvtColor(musicTemplate1, musicTemplate1, Imgproc.COLOR_RGB2GRAY);
                music2 = targetDir + "/MusicLowerPic2.jpg"; // MusicLowerPic2.jpg는 그림까지, MusicLowerName2.jpg는 곡명 부분만
                musicTemplate2 = Imgcodecs.imread(music2);
                Imgproc.cvtColor(musicTemplate2, musicTemplate2, Imgproc.COLOR_RGB2GRAY);
                break;
            case "upper":
                music1 = targetDir + "/MusicUpperPic1.jpeg";
                musicTemplate1 = Imgcodecs.imread(music1);
                Imgproc.cvtColor(musicTemplate1, musicTemplate1, Imgproc.COLOR_RGB2GRAY);
                music2 = targetDir + "/MusicUpperPic2.jpg";
                musicTemplate2 = Imgcodecs.imread(music2);
                Imgproc.cvtColor(musicTemplate2, musicTemplate2, Imgproc.COLOR_RGB2GRAY);
                break;
            case "sample":
                music1 = targetDir + "/MusicValidationSample.jpg";
                musicTemplate1 = Imgcodecs.imread(music1);
                Imgproc.cvtColor(musicTemplate1, musicTemplate1, Imgproc.COLOR_RGB2GRAY);
                music2 = targetDir + "/MusicValidationSample.jpg";
                musicTemplate2 = Imgcodecs.imread(music2);
                Imgproc.cvtColor(musicTemplate2, musicTemplate2, Imgproc.COLOR_RGB2GRAY);
                break;
            default:
                return "InvalidDivisionError";
        }

        // Read the input image (target)
        String fileName = target.getFileName().toString();
        String fileFullName = targetDir + "/" + fileName;
        Mat frame = Imgcodecs.imread(fileFullName);

        // Resize if image is too large
        int sizeThresh = 4096;
        double reduceFactor = 0.5;
        if (frame.width() >= sizeThresh || frame.height() >= sizeThresh) {
            System.out.println("The image named " + fileName + " is quite large, should be resized.");
            Size resize = new Size(frame.width() * reduceFactor, frame.height() * reduceFactor);
            Imgproc.resize(frame, frame, resize);
        }

        // Template Matching - 점수가 있는 영역 찾기
        //templateMatching(frame, CannyTemplate, fileName);

        // Keypoint Matching - mainly from: docs.opencv.org/4.1.0/d7/dff/tutorial_feature_homography.html
        float[] scoreRegionData = findRegionWithKeypointMatching(frame, ScoreTemplate, fileName); // Get crop with score
        ScoreTemplate.release();
        Mat ocrFrame;
        String imageType;
        if (scoreRegionData != null) {
            ocrFrame = getScoreCrop(frame, scoreRegionData, 0.6);
            imageType = "CAM";
            ScoreAppTemplate.release();
        } else {
            scoreRegionData = findRegionWithKeypointMatching(frame, ScoreAppTemplate, fileName);
            ScoreAppTemplate.release();
            if (scoreRegionData != null) {
                ocrFrame = getScoreCrop(frame, scoreRegionData, 0.5);
                imageType = "APP";
            } else {
                System.out.println("The image named " + fileName + " seems not a result screen.");
                return "InvalidImageError";
            }
        }
        // Music Validation
        int musicNumber;
        Mat vldFrame;
        float[] musicRegionData = findRegionWithKeypointMatching(frame, musicTemplate1, fileName);
        musicTemplate1.release();
        if (musicRegionData != null) {
            vldFrame = getScoreCrop(frame, musicRegionData, 0.0);
            musicNumber = 1;
            vldFrame.release();
            musicTemplate2.release();
            frame.release();
        } else { // e-Amusement App 사진으로 올린 경우
            if (division.equals("lower") && imageType.equals("APP")) { // Starry Sky는 별도의 template 사용
                music2 = targetDir + "/MusicLowerApp2.jpg"; // Lower Music 2 for APP images
                musicTemplate2 = Imgcodecs.imread(music2);
                Imgproc.cvtColor(musicTemplate2, musicTemplate2, Imgproc.COLOR_RGB2GRAY);
            }
            musicRegionData = findRegionWithKeypointMatching(frame, musicTemplate2, fileName);
            musicTemplate2.release();
            if (musicRegionData != null) {
                vldFrame = getScoreCrop(frame, musicRegionData, 0.0);
                musicNumber = 2;
                vldFrame.release();
                frame.release();
            } else {
                System.out.println("The image named " + fileName + " seems not suitable for preliminary round.");
                frame.release();
                return "InvalidMusicError";
            }
        }

        // 곡 이름이 다른데 곡 이름 영역이 인식되었을 경우 2단계 처리를 해야한다
        String textResult = "===== Reading Text =====\n";
        int resizeFactor = 32;
        Core.copyMakeBorder(ocrFrame, ocrFrame, 0, ocrFrame.height() % 2,
                ocrFrame.width() % 2, 0, Core.BORDER_CONSTANT, new Scalar(0, 0, 0));
        int widthRemainder = ocrFrame.width() % resizeFactor;
        int heightRemainder = ocrFrame.height() % resizeFactor;
        int hPadding = (resizeFactor - widthRemainder) / 2;
        int vPadding = (resizeFactor - heightRemainder) / 2;
        Core.copyMakeBorder(ocrFrame, ocrFrame, vPadding, vPadding,
                hPadding, hPadding, Core.BORDER_CONSTANT, new Scalar(255, 255, 255));
        Imgproc.GaussianBlur(ocrFrame, ocrFrame, new Size(3, 3), 0.0, 0.0);

        String fileTessName = targetDir + "/tess_" + fileName;
        Imgcodecs.imwrite(fileTessName, ocrFrame);
//        textResult += processingImageData(Paths.get(fileTessName));
//        textResult += "=====\n";
        ocrFrame.release();

        // Score Detection with AWS Rekognition
        String detectScore = awsRekognitionService.detectScore(fileTessName, imageType);
        String musicCode = division + musicNumber;
        try {
            int score = Integer.parseInt(detectScore);
            switch (musicCode) {
                case "upper1":
                    if (score > 1800) {
                        System.out.println("Score cap check failed for " + fileTessName + ": upper1 - " + score + " / 1800");
                        //return "InvalidDifficultyError";
                    }
                    break;
                case "upper2":
                    if (score > 1572) {
                        System.out.println("Score cap check failed for " + fileTessName + ": upper2 - " + score + " / 1572");
                        //return "InvalidDifficultyError";
                    }
                    break;
                case "lower1":
                    if (score > 921) {
                        System.out.println("Score cap check failed for " + fileTessName + ": lower1 - " + score + " / 921");
                        return "InvalidDifficultyError";
                    }
                    break;
                case "lower2":
                    if (score > 1170) {
                        System.out.println("Score cap check failed for " + fileTessName + ": lower2 - " + score + " / 1170");
                        return "InvalidDifficultyError";
                    }
                    break;
            }
        } catch (NumberFormatException ex) {
            System.out.println("Cannot find EX SCORE for " + fileTessName);
            return "UnavailableGameScoreError";
        }
        textResult += detectScore;
        textResult += "\n=====";
        System.out.println(textResult);

        return musicCode + "_" + detectScore;
    }

    private static List<RotatedRect> decode(Mat scores, Mat geometry, List<Float> confidences, float scoreThresh) {
        // size of 1 geometry plane
        int W = geometry.cols();
        int H = geometry.rows() / 5;
        //System.out.println(geometry);
        //System.out.println(scores);

        List<RotatedRect> detections = new ArrayList<>();
        for (int y = 0; y < H; ++y) {
            Mat scoresData = scores.row(y);
            Mat x0Data = geometry.submat(0, H, 0, W).row(y);
            Mat x1Data = geometry.submat(H, 2 * H, 0, W).row(y);
            Mat x2Data = geometry.submat(2 * H, 3 * H, 0, W).row(y);
            Mat x3Data = geometry.submat(3 * H, 4 * H, 0, W).row(y);
            Mat anglesData = geometry.submat(4 * H, 5 * H, 0, W).row(y);

            for (int x = 0; x < W; ++x) {
                double score = scoresData.get(0, x)[0];
                if (score >= scoreThresh) {
                    double offsetX = x * 4.0;
                    double offsetY = y * 4.0;
                    double angle = anglesData.get(0, x)[0];
                    double cosA = Math.cos(angle);
                    double sinA = Math.sin(angle);
                    double x0 = x0Data.get(0, x)[0];
                    double x1 = x1Data.get(0, x)[0];
                    double x2 = x2Data.get(0, x)[0];
                    double x3 = x3Data.get(0, x)[0];
                    double h = x0 + x2;
                    double w = x1 + x3;
                    Point offset = new Point(offsetX + cosA * x1 + sinA * x2, offsetY - sinA * x1 + cosA * x2);
                    Point p1 = new Point(-1 * sinA * h + offset.x, -1 * cosA * h + offset.y);
                    Point p3 = new Point(-1 * cosA * w + offset.x, sinA * w + offset.y); // original trouble here !
                    RotatedRect r = new RotatedRect(new Point(0.5 * (p1.x + p3.x), 0.5 * (p1.y + p3.y)), new Size(w, h), -1 * angle * 180 / Math.PI);
                    detections.add(r);
                    confidences.add((float) score);
                }
            }
        }
        return detections;
    }

    private String findCannyEdgeFromMatrix(Mat cropFrame, String fileName) {
        Mat grayFrame = new Mat();
        Mat blurFrame = new Mat();
        Mat cannyFrame = new Mat();
        //Imgproc.cvtColor(cropFrame, grayFrame, Imgproc.COLOR_RGB2GRAY);
        //Imgproc.GaussianBlur(grayFrame, blurFrame, new Size(3,3), 0.0, 0.0);
        String grayName = targetDir + "/gray_" + fileName;
        Imgcodecs.imwrite(grayName, grayFrame);
        String blurName = targetDir + "/blur_" + fileName;
        Imgcodecs.imwrite(blurName, blurFrame);

        Imgproc.Canny(blurFrame, cannyFrame, 75.0, 175.0);
        // originally 75, 200 --> tried 70, 180
        String outName = targetDir + "/result_" + fileName;
        Imgcodecs.imwrite(outName, cannyFrame);
        return outName;
    }

    private String findCannyEdgeFromImageData(String imgPath, String fileName) {
        Mat cropFrame = Imgcodecs.imread(imgPath);
        Mat grayFrame = Imgcodecs.imread(imgPath);
        Mat blurFrame = new Mat();
        Mat cannyFrame = new Mat();
        Imgproc.cvtColor(cropFrame, grayFrame, Imgproc.COLOR_RGB2GRAY);
        //Imgproc.medianBlur(grayFrame, grayFrame, 3);
        Imgproc.GaussianBlur(grayFrame, blurFrame, new Size(3, 3), 0.0, 0.0);
        //Imgproc.threshold(grayFrame, grayFrame, 0, 255, Imgproc.THRESH_OTSU);
        String grayName = targetDir + "/gray_" + fileName;
        Imgcodecs.imwrite(grayName, grayFrame);
        String blurName = targetDir + "/blur_" + fileName;
        Imgcodecs.imwrite(blurName, blurFrame);
        // find reasonable threshold (adaptive by each image)
        for (int k = 0; k < 11; k++) {
            double lowTh = k * 10.0;
            double highTh = lowTh * 2 + 40.0;
            Mat cnyFrame = new Mat();
            Mat mrpFrame = new Mat();
            Imgproc.Canny(blurFrame, cnyFrame, lowTh, highTh);
            String cnyName = targetDir + "/canny" + k + "_" + fileName;
            Imgcodecs.imwrite(cnyName, cnyFrame);
            Rect roiRect = findScreen(cnyName);
            //edge 뭉치기
            //Mat mcKernel = new Mat(5, 5, CvType.CV_8U, Scalar.all(1));
            Mat mcKernel = Imgproc.getStructuringElement(Imgproc.MORPH_ELLIPSE, new Size(11, 11));
            Imgproc.morphologyEx(cnyFrame, mrpFrame, Imgproc.MORPH_CLOSE, mcKernel);
            String tmpName = targetDir + "/result" + k + "_" + fileName;
            Imgcodecs.imwrite(tmpName, mrpFrame);
            roiRect = findScreen(tmpName);
        }
        // find median of image - for adaptive threshold
        double m = blurFrame.rows() * blurFrame.cols() / 2;
        int bin = 0;
        double med = -1.0;
        List<Mat> listImage = new ArrayList<Mat>();
        listImage.add(blurFrame);
        MatOfInt grayChannel = new MatOfInt(0);
        MatOfInt histSize = new MatOfInt(256);
        MatOfFloat histRange = new MatOfFloat(0, 255);
        Mat histImage = new Mat();
        Imgproc.calcHist(listImage, grayChannel, new Mat(), histImage, histSize, histRange, false);
        for (int i = 0; i < histSize.get(0, 0)[0]; i++) {
            bin += Math.round(histImage.get(i, 0)[0]);
            if (bin > m) {
                med = i;
                break;
            }
        }
        // Adaptive canny
        double sigma = 0.33;
        double adaptLowTh = Math.max(0.0, (1.0 - sigma) * med);
        double adaptHighTh = Math.min(255.0, (1.0 + sigma) * med);
        Imgproc.Canny(blurFrame, cannyFrame, adaptLowTh, adaptHighTh);
        // originally 75, 200 --> tried 70, 200
        String outName = targetDir + "/result_" + fileName;
        Imgcodecs.imwrite(outName, cannyFrame);
        return outName;
    }

    private void templateMatching(Mat frame, Mat template, String fileName) {
        Mat grayFrame = new Mat();
        Imgproc.cvtColor(frame, grayFrame, Imgproc.COLOR_RGB2GRAY);

        Imgproc.cvtColor(template, template, Imgproc.COLOR_RGB2GRAY);
        Imgproc.Canny(template, template, 70.0, 175.0);

        Mat resizedFrame = new Mat();
        Mat mtResult = new Mat();
        double bestMatchRate = -1.0;
        Point bestMatchLocation = new Point();
        double bestMatchScale = -1.0;
        for (double imgScale = 1.0; imgScale >= 0.1; imgScale -= 0.05) {
            Size resize = new Size(grayFrame.width() * imgScale, grayFrame.height() * imgScale);
            Imgproc.resize(grayFrame, resizedFrame, resize);

            if (resizedFrame.width() < template.width() || resizedFrame.height() < template.height())
                break;

            Imgproc.Canny(resizedFrame, resizedFrame, 70.0, 175.0);
            Imgproc.matchTemplate(resizedFrame, template, mtResult, Imgproc.TM_CCOEFF);
            Core.MinMaxLocResult res = Core.minMaxLoc(mtResult);
            //Imgproc.rectangle(resizedFrame, res.maxLoc,
            //        new Point(res.maxLoc.x + CannyTemplate.width(), res.maxLoc.y + CannyTemplate.height()), new Scalar(0, 0, 255), 1);
            //String fileResizeName = targetDir + "/resize" + (int)(imgScale * 100) + "_" + fileName;
            //Imgcodecs.imwrite(fileResizeName, resizedFrame);

            if (res.maxVal > bestMatchRate) {
                bestMatchRate = res.maxVal;
                bestMatchLocation = res.maxLoc;
                bestMatchScale = imgScale;
            }
        }
        Point resultLoc1 = new Point(bestMatchLocation.x / bestMatchScale, bestMatchLocation.y / bestMatchScale);
        Point resultLoc2 = new Point((bestMatchLocation.x + template.width()) / bestMatchScale, (bestMatchLocation.y + template.height()) / bestMatchScale);
        Imgproc.rectangle(frame, resultLoc1, resultLoc2, new Scalar(0, 255, 0, 255), 2);
        String fileMatchName = targetDir + "/matching_" + fileName;
        Imgcodecs.imwrite(fileMatchName, frame);
    }

    private float[] findRegionWithKeypointMatching(Mat frame, Mat template, String fileName) {
        // Mainly from: docs.opencv.org/4.1.0/d7/dff/tutorial_feature_homography.html
        int matchCountThreshold = 20; // 190824 - Increase Threshold to 15, 190827 - Decrease to 10 (Starry Sky, other noises)
        // 190828 Increase to 20 and change template to higher resolution
        Mat grayFrame = new Mat();
        Imgproc.cvtColor(frame, grayFrame, Imgproc.COLOR_RGB2GRAY);

        double hessianThreshold = 400;
        int nOctaves = 4, nOctaveLayers = 3;
        boolean extended = false, upright = false;
        SURF detector = SURF.create(hessianThreshold, nOctaves, nOctaveLayers, extended, upright);
        MatOfKeyPoint keypointsObject = new MatOfKeyPoint(), keypointsScene = new MatOfKeyPoint();
        Mat descriptorsObject = new Mat(), descriptorsScene = new Mat();
        detector.detectAndCompute(template, new Mat(), keypointsObject, descriptorsObject);
        detector.detectAndCompute(grayFrame, new Mat(), keypointsScene, descriptorsScene);

        DescriptorMatcher matcher = DescriptorMatcher.create(DescriptorMatcher.FLANNBASED);
        List<MatOfDMatch> knnMatches = new ArrayList<>();
        matcher.knnMatch(descriptorsObject, descriptorsScene, knnMatches, 2);

        double ratioThresh = 0.75;
        List<DMatch> listOfGoodMatches = new ArrayList<>();
        for (MatOfDMatch knnMatch : knnMatches) {
            if (knnMatch.rows() > 1) {
                DMatch[] matches = knnMatch.toArray();
                if (matches[0].distance < ratioThresh * matches[1].distance) {
                    listOfGoodMatches.add(matches[0]);
                }
            }
        }
        MatOfDMatch goodMatches = new MatOfDMatch();
        goodMatches.fromList(listOfGoodMatches);

        if (listOfGoodMatches.size() >= matchCountThreshold) {
            System.out.println("Enough matches are found for " + fileName + " - " + listOfGoodMatches.size() + "/" + matchCountThreshold);
            //-- Draw matches
            Mat imgMatches = new Mat();
            Features2d.drawMatches(template, keypointsObject, grayFrame, keypointsScene, goodMatches, imgMatches, Scalar.all(-1),
                    Scalar.all(-1), new MatOfByte(), Features2d.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS);

            //-- Localize the object
            List<Point> obj = new ArrayList<>();
            List<Point> scene = new ArrayList<>();
            List<KeyPoint> listOfKeypointsObject = keypointsObject.toList();
            List<KeyPoint> listOfKeypointsScene = keypointsScene.toList();
            for (int i = 0; i < listOfGoodMatches.size(); i++) {
                //-- Get the keypoints from the good matches
                obj.add(listOfKeypointsObject.get(listOfGoodMatches.get(i).queryIdx).pt);
                scene.add(listOfKeypointsScene.get(listOfGoodMatches.get(i).trainIdx).pt);
            }
            MatOfPoint2f objMat = new MatOfPoint2f(), sceneMat = new MatOfPoint2f();
            objMat.fromList(obj);
            sceneMat.fromList(scene);
            double ransacReprojThreshold = 3.0;
            Mat H = Calib3d.findHomography(objMat, sceneMat, Calib3d.RANSAC, ransacReprojThreshold);

            //-- Get the corners from the image_1 (the object to be "detected")
            Mat objCorners = new Mat(4, 1, CvType.CV_32FC2), sceneCorners = new Mat();
            float[] objCornersData = new float[(int) (objCorners.total() * objCorners.channels())];
            objCorners.get(0, 0, objCornersData);
            objCornersData[0] = 0;
            objCornersData[1] = 0;
            objCornersData[2] = template.cols();
            objCornersData[3] = 0;
            objCornersData[4] = template.cols();
            objCornersData[5] = template.rows();
            objCornersData[6] = 0;
            objCornersData[7] = template.rows();
            objCorners.put(0, 0, objCornersData);
            Core.perspectiveTransform(objCorners, sceneCorners, H); // template과 닮은 부분을 못 찾을 경우 여기서 에러났었다
            float[] sceneCornersData = new float[(int) (sceneCorners.total() * sceneCorners.channels())];
            sceneCorners.get(0, 0, sceneCornersData);
            //-- Draw lines between the corners (the mapped object in the scene - image_2 )
            Imgproc.line(imgMatches, new Point(sceneCornersData[0] + template.cols(), sceneCornersData[1]),
                    new Point(sceneCornersData[2] + template.cols(), sceneCornersData[3]), new Scalar(0, 255, 0), 4);
            Imgproc.line(imgMatches, new Point(sceneCornersData[2] + template.cols(), sceneCornersData[3]),
                    new Point(sceneCornersData[4] + template.cols(), sceneCornersData[5]), new Scalar(0, 255, 0), 4);
            Imgproc.line(imgMatches, new Point(sceneCornersData[4] + template.cols(), sceneCornersData[5]),
                    new Point(sceneCornersData[6] + template.cols(), sceneCornersData[7]), new Scalar(0, 255, 0), 4);
            Imgproc.line(imgMatches, new Point(sceneCornersData[6] + template.cols(), sceneCornersData[7]),
                    new Point(sceneCornersData[0] + template.cols(), sceneCornersData[1]), new Scalar(0, 255, 0), 4);
            // (0,1) - (2,3)
            // (6,7) - (4,5)
            // (x1, y1) - (x2, y2) -> (x2 + (x2-x1) * 0.6, y2 + (y2-y1) * 0.6)
            // (x4, y4) - (x3, y3) -> ...
            String fileKPMName = targetDir + "/kpmatch_" + fileName;
            Imgcodecs.imwrite(fileKPMName, imgMatches);

            H.release();
            objCorners.release();
            grayFrame.release();

            return sceneCornersData;
        } else {
            System.out.println("Not enough matches are found for " + fileName + " - " + listOfGoodMatches.size() + "/" + matchCountThreshold);
            grayFrame.release();
            return null;
        }
    }

    private Mat getScoreCrop(Mat frame, float[] sceneCornersData, double expandRight) {
        // 숫자까지 포함하는 Rotatedrect 잡기
        MatOfPoint obtainedContour = new MatOfPoint(
                new Point(sceneCornersData[0], sceneCornersData[1]),
                new Point(sceneCornersData[2] * (1 + expandRight) - sceneCornersData[0] * expandRight,
                        sceneCornersData[3] * (1 + expandRight) - sceneCornersData[1] * expandRight),
                new Point(sceneCornersData[4] * (1 + expandRight) - sceneCornersData[6] * expandRight,
                        sceneCornersData[5] * (1 + expandRight) - sceneCornersData[7] * expandRight),
                new Point(sceneCornersData[6], sceneCornersData[7]));

        MatOfPoint2f approxCurve = new MatOfPoint2f();
        MatOfPoint2f contour2f = new MatOfPoint2f(obtainedContour.toArray());
        double approxDistance = Imgproc.arcLength(contour2f, true) * 0.02;
        Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);

        MatOfPoint points = new MatOfPoint(approxCurve.toArray());
        //List<MatOfPoint> ocpoints = new ArrayList<>();
        //ocpoints.add(points);
        //Imgproc.polylines(frame, ocpoints, true, new Scalar(255, 0, 0), 3); // 비교용 - 점수 영역
        Rect obtainedRect = Imgproc.boundingRect(points);
        //Imgproc.rectangle(frame, obtainedRect, new Scalar(0, 0, 255), 3); // 비교용 - 점수 영역의 boundingRect
        MatOfPoint brPoints = new MatOfPoint(new Point(0, 0), new Point(obtainedRect.width, 0),
                new Point(obtainedRect.width, obtainedRect.height), new Point(0, obtainedRect.height));
        MatOfPoint2f brPoints2f = new MatOfPoint2f(brPoints.toArray());
        Mat ptMat = Imgproc.getPerspectiveTransform(contour2f, brPoints2f);

        Mat result = frame.clone();
        Imgproc.warpPerspective(result, result, ptMat, new Size(obtainedRect.width, obtainedRect.height));
        return result;
    }

    private Rect findScreen(String imgPath) {
        Mat cannyFrame = Imgcodecs.imread(imgPath);
        Mat tmpFrame = new Mat();
        Imgproc.cvtColor(cannyFrame, tmpFrame, Imgproc.COLOR_RGB2GRAY);
        // https://stackoverflow.com/questions/13203981/findcontours-error-support-only-8uc1-images
        List<MatOfPoint> contours = new ArrayList<>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(tmpFrame, contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE);

        MatOfPoint2f approxCurve = new MatOfPoint2f();
        double largestArea = 0.0;
        Rect largestRect = new Rect();
        Rect currentRect;
        for (MatOfPoint contour : contours) {
//            double contArea = Imgproc.contourArea(contour);
//            if (contArea > largestArea) {
            MatOfPoint2f contour2f = new MatOfPoint2f(contour.toArray());
            double approxDistance = Imgproc.arcLength(contour2f, true) * 0.02;
            Imgproc.approxPolyDP(contour2f, approxCurve, approxDistance, true);

            MatOfPoint points = new MatOfPoint(approxCurve.toArray());
            currentRect = Imgproc.boundingRect(points);

            double contArea = currentRect.area();
            if (currentRect.width > 20.0 && currentRect.height > 10.0)
                Imgproc.rectangle(cannyFrame, currentRect, new Scalar(0, 255, 0, 255));

            if (contArea > largestArea) {
                largestArea = contArea;
                largestRect = currentRect;
            }
//            }
        }
        Imgproc.rectangle(cannyFrame, largestRect, new Scalar(0, 0, 255, 255));
        Imgcodecs.imwrite(imgPath, cannyFrame);

        hierarchy.release();
        tmpFrame.release();
        cannyFrame.release();

        return largestRect;
    }

//    private String processingImageData(Path imgPath) {
//        String result = "";
//        PIX image = null;
//        try {
//            image = pixRead(imgPath.toString());
//            tessAPI.SetImage(image);
//            // Warning: Invalid resolution 0 dpi. Using 70 instead.
//            tessAPI.SetSourceResolution(300);
//
//            BytePointer outText = tessAPI.GetUTF8Text();
//            if (outText != null) {
//                result = outText.getString();
//                outText.deallocate();
//            }
//        } catch (Exception ex) {
//            ex.printStackTrace();
//            throw ex;
//        } finally {
//            pixDestroy(image);
//        }
//
//        return result;
//    }

    @PreDestroy
    void cleanup() {
        System.out.println("Closing TessBaseAPI!");
        //tessAPI.End();
    }
}
