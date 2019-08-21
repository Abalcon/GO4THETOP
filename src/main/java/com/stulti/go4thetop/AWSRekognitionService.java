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

    public String detectScore(String imgPath) throws IOException {
        BufferedImage scoreImage = ImageIO.read(new File(imgPath));
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scoreImage, "jpg", baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        baos.close();
        ByteBuffer buf = ByteBuffer.wrap(imageInByte);
        DetectTextRequest request = new DetectTextRequest().withImage(new Image().withBytes(buf));

        String detectResult = "";
        StringBuilder sb = new StringBuilder();
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
            for (int i = totalDetections - 2; i < totalDetections; i++) {
                sb.append(textDetections.get(i).getDetectedText());
                sb.append(" ");
            }
            detectResult = sb.toString();
        } catch (AmazonRekognitionException e) {
            e.printStackTrace();
        }

        return detectResult;
    }
}
