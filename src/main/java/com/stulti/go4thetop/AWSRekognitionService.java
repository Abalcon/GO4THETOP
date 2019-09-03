package com.stulti.go4thetop;

import com.amazonaws.services.rekognition.AmazonRekognition;
import com.amazonaws.services.rekognition.model.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.util.List;

import static com.amazonaws.util.IOUtils.toByteArray;

@Service
public class AWSRekognitionService {
    private final AmazonRekognition client;

    public AWSRekognitionService(AmazonRekognition client) {
        this.client = client;
    }

    public String detectScore(String imgPath, String imgType) throws IOException {
        File scoreImage = new File(imgPath);
        InputStream scoreStream = new FileInputStream(scoreImage);
        byte[] imageInByte = toByteArray(scoreStream);
        ByteBuffer buf = ByteBuffer.wrap(imageInByte);
        DetectTextRequest request = new DetectTextRequest().withImage(new Image().withBytes(buf));

        String detectResult = "";
        //StringBuilder sb = new StringBuilder();
        try {
            DetectTextResult result = client.detectText(request);
            List<TextDetection> textDetections = result.getTextDetections();
            System.out.println("=== Detected lines and words ===");
            for (TextDetection text : textDetections) {
                System.out.println("Detected: " + text.getDetectedText()
                        + ", Confidence: " + text.getConfidence().toString()
                        + ", Id : " + text.getId()
                        + ", Parent Id: " + text.getParentId()
                        + ", Type: " + text.getType());
            }

            int totalDetections = textDetections.size();

            if (imgType.equals("CAM")) {
                String exScore = textDetections.get(totalDetections - 1).getDetectedText().replaceAll("\\s", "");
                String fellout = textDetections.get(totalDetections - 2).getDetectedText().replaceAll("\\s", "");
                try {
                    Integer.parseInt(fellout);
                    detectResult = fellout + exScore;
                } catch (NumberFormatException ex) {
                    detectResult = exScore;
                }
            } else if (imgType.equals("APP")) {
                int appScore = 0;
                String[] judges = new String[6];
                int judgeIndex = -1;
                StringBuilder sb = new StringBuilder();
                // Example output for an app image: "MARVELOUS0462PERFECT0041GREAT0000GOOD0000O.K.0021Miss0000"
                // {"MARVELOUS0462", "PERFECT0041", "GREAT0000", "GOOD0000", "O.K.0021", "Miss0000"}
                // 0~8 '9~12' 13~19 '20~23' 24~28 '29~32' 33~36 37~40 41~44 '45~48' 49~52 53~56
                for (TextDetection text : textDetections) {
                    if (text.getType().equals("WORD")) {
                        if (text.getDetectedText().chars().anyMatch(Character::isLetter)) {
                            if (judgeIndex > -1 && judgeIndex < 6) {
                                judges[judgeIndex] = sb.toString().replaceAll("\\s", "");
                                System.out.println(judges[judgeIndex]);
                            }
                            sb.delete(0, sb.length());
                            judgeIndex++;
                        }
                        sb.append(text.getDetectedText());
                    }
                }
                judges[judgeIndex] = sb.toString().replaceAll("\\s", "");
                System.out.println(judges[judgeIndex]);

                for (int i = 0; i < judges.length; i++) {
                    if (judges[i].chars().filter(Character::isDigit).count() < 4) {
                        System.out.println("Recognition system missed a number at index " + i);
                        judges[i] += "1"; // 보통 1을 빠뜨린다 - 글자 사이의 거리가 멀어서 오류가 나는 것으로 추정
                    }
                }

                try {
                    appScore += Integer.parseInt(judges[0].substring(judges[0].length() - 4)) * 3;
                    appScore += Integer.parseInt(judges[1].substring(judges[1].length() - 4)) * 2;
                    appScore += Integer.parseInt(judges[2].substring(judges[2].length() - 4));
                    appScore += Integer.parseInt(judges[4].substring(judges[3].length() - 4)) * 3;
                } catch (NumberFormatException ex) {
                    System.out.println("Oops, looks like the recognition result is corrupted");
                }

                detectResult = appScore + "";
            }

        } catch (AmazonRekognitionException e) {
            e.printStackTrace();
        }

        return detectResult;
    }
}
