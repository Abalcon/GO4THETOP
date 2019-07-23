package com.stulti.go4thetop;

import org.bytedeco.javacpp.BytePointer;
import org.bytedeco.leptonica.PIX;
import org.bytedeco.tesseract.TessBaseAPI;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;

import static org.bytedeco.leptonica.global.lept.pixDestroy;
import static org.bytedeco.leptonica.global.lept.pixRead;

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

    private TessBaseAPI tessAPI = new TessBaseAPI();

    public static ImageRecognitionServiceImpl get() throws IOException {
        return new ImageRecognitionServiceImpl();
    }

    private ImageRecognitionServiceImpl() throws IOException {
        if (!Files.exists(targetDir)) {
            Files.createDirectories(targetDir);
        }

        tessAPI.Init(targetDir.toString(), "eng+jpn+kor");
    }


    public String recognizeImageData(String imgPath, InputStream imageData) throws IOException {
        assert (imageData != null);

        Path target = getImagePath(imgPath);
        Files.copy(imageData, target, StandardCopyOption.REPLACE_EXISTING);

        return processingImageData(target);
    }

    private String processingImageData(Path imgPath) {
        String result = "";
        PIX image = null;
        try {
            image = pixRead(imgPath.toString());
            tessAPI.SetImage(image);

            BytePointer outText = tessAPI.GetUTF8Text();
            if (outText != null) {
                result = outText.getString();
                outText.deallocate();
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw ex;
        } finally {
            pixDestroy(image);
        }

        return result;
    }

    @PreDestroy
    void cleanup() {
        System.out.println("Closing TessBaseAPI!");
        tessAPI.End();
    }
}
