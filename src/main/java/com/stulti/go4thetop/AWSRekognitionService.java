package com.stulti.go4thetop;

import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.model.*;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.List;

@Service
public class AWSRekognitionService {
    private AmazonRekognition client;

    public AWSRekognitionService(AmazonRekognition client) {
        this.client = client;
    }

    public String detectScore(String imgPath, String imgType) throws IOException {
        BufferedImage scoreImage = ImageIO.read(new File(imgPath));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scoreImage, "jpg", baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        baos.close();
        ByteBuffer buf = ByteBuffer.wrap(imageInByte);
        DetectTextRequest request = new DetectTextRequest().withImage(new Image().withBytes(buf));

        String detectResult = "";
        //StringBuilder sb = new StringBuilder();
        try {
            DetectTextResult result = client.detectText(request);
            List<TextDetection> textDetections = result.getTextDetections();
            System.out.println("Detected lines and words for " + imgPath);
            for (TextDetection text : textDetections) {

                System.out.println("Detected: " + text.getDetectedText());
                System.out.println("Confidence: " + text.getConfidence().toString());
                System.out.println("Id : " + text.getId());
                System.out.println("Parent Id: " + text.getParentId());
                System.out.println("Type: " + text.getType());
                System.out.println();
            }

            int totalDetections = textDetections.size();

            if (imgType.equals("CAM")) {
                String exScore = textDetections.get(totalDetections - 1).getDetectedText();
                String fellout = textDetections.get(totalDetections - 2).getDetectedText();
                try {
                    Integer.parseInt(fellout);
                    detectResult = fellout + exScore;
                } catch (NumberFormatException ex) {
                    detectResult = exScore;
                }
            } else if (imgType.equals("APP")) {
                int appScore = 0;
                for (TextDetection text : textDetections) {
                    if (text.getType().equals("LINE")) {
                        try {
                            String lineText = text.getDetectedText().trim().replaceAll("\\s", "");
                            if (lineText.length() == 13) { // MARVELOUS
                                System.out.println(lineText.substring(9));
                                appScore += Integer.parseInt(lineText.substring(9)) * 3;
                            } else if (lineText.length() == 11) { // PERFECT (PEREECT로 오인식하는 문제가 있다)
                                System.out.println(lineText.substring(7));
                                appScore += Integer.parseInt(lineText.substring(7)) * 2;
                            } else if (lineText.length() == 9) { // GREAT
                                System.out.println(lineText.substring(5));
                                appScore += Integer.parseInt(lineText.substring(5));
                            } else if (lineText.length() <= 8 && lineText.contains("K")) { // O.K.
                                System.out.println(lineText.substring(4));
                                appScore += Integer.parseInt(lineText.substring(4)) * 3;
                            }
                        } catch (NumberFormatException ex) {
                            System.out.println("Oops, looks like the image is not good");
                        }
                    }
                }
                detectResult = appScore + "";
            }

        } catch (AmazonRekognitionException e) {
            e.printStackTrace();
        }

        return detectResult;
    }
}
