package com.stulti.go4thetop;

import java.io.IOException;
import java.io.InputStream;

public interface ImageRecognitionService {
    String recognizeImageData(String imgPath, InputStream imageData, String division) throws IOException;
}
