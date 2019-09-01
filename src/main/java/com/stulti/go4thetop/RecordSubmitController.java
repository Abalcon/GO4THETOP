package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "https://www.go4thetop.net"}, maxAge = 3600)
@Controller
public class RecordSubmitController {

    private final ContenderRepository ctdRepo;
    private final ImageRecognitionService imgService;

    @Autowired
    public RecordSubmitController(ContenderRepository repository, ImageRecognitionService imageService) {
        this.ctdRepo = repository;
        this.imgService = imageService;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Contender Information is Incorrect.")
    private class IncorrectContenderInfoException extends RuntimeException {
        // 이메일 주소, 참가자 이름, 댄서 이름 중에 하나라도 일치하지 않는 경우
        private IncorrectContenderInfoException(String message) {
            super(message);
        }
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Invalid division.")
    private class InvalidDivisionException extends RuntimeException {
        // 이메일 주소, 참가자 이름, 댄서 이름 중에 하나라도 일치하지 않는 경우
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The image you submitted is not a result screen.")
    private class InvalidImageFileException extends RuntimeException {
        // 올바른 이미지가 아닌 경우 - 기록 사진으로 분류할 수 없는 이미지
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Invalid music for the preliminary round.")
    private class InvalidMusicNameException extends RuntimeException {
        // 예선 과제곡이 아니거나, 참가하지 않는 부문에 속한 곡(Lower/Upper 미참가자가 Lower/Upper 과제곡을 제출)인 경우
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Cannot check EX SCORE of your submission.")
    private class UnavailableGameScoreException extends RuntimeException {
        // EX SCORE를 인식할 수 없는 경우
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Cannot check EX SCORE of your submission.")
    private class InvalidDifficultyException extends RuntimeException {
        // 예선 지정곡은 맞으나, 지정된 난이도가 아닌 경우
    }

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "An error occurred in processing your submission.")
    private class ImageRecognitionFailException extends RuntimeException {
        // 이메일 주소, 참가자 이름, 댄서 이름 중에 하나라도 일치하지 않는 경우
    }

    @PostMapping(value = "/preliminary/sample")
    public @ResponseBody
    String resultImageSample(String imgName, HttpServletRequest request) {
        String result;
        try {
            result = imgService.recognizeImageData(imgName, request.getInputStream(), "sample");
            if (result.equals("InvalidDivisionError")) {
                throw new InvalidDivisionException();
            }
            if (result.equals("InvalidImageError")) {
                throw new InvalidImageFileException();
            }
            if (result.equals("InvalidMusicError")) {
                throw new InvalidMusicNameException();
            }

            //TODO:
        } catch (InvalidImageFileException | InvalidMusicNameException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new ImageRecognitionFailException();
        }

        return result;
    }

    @PostMapping(value = "/preliminary/lower")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveLowerRecord(String cardName, MultipartHttpServletRequest request) {
        System.out.println("The contender called " + cardName + " try to submit records!");
        String result1 = "", result2 = "";
        try {
            List<Contender> contenderWithCardName = ctdRepo.findByCardName(cardName);
            if (contenderWithCardName.isEmpty() || !contenderWithCardName.get(0).getLower()) {
                throw new IncorrectContenderInfoException("Dancer name or division is incorrect.");
            }
            cardName = cardName.replace(".", "_"); // "." 때문에 opencv에서 잘못 인식함
            cardName = cardName.replace("-", "_"); // "-" 때문에 opencv에서 잘못 인식함
            Part filePart1 = request.getPart("lower1");
            if (filePart1 != null) {
                String fileName1 = cardName + "_" + filePart1.getSubmittedFileName();
                result1 = imgService.recognizeImageData(fileName1, filePart1.getInputStream(), "lower");
                checkValidity(result1);
            }

            Part filePart2 = request.getPart("lower2");
            if (filePart2 != null) {
                String fileName2 = cardName + "_" + filePart2.getSubmittedFileName();
                result2 = imgService.recognizeImageData(fileName2, filePart2.getInputStream(), "lower");
                checkValidity(result2);
            }

            // 도출된 점수를 DB에 반영 - "lower1_1024"
            String[] scoreInfo = {result1, result2};
            updateScore(contenderWithCardName.get(0), scoreInfo);

        } catch (IncorrectContenderInfoException | InvalidImageFileException |
                InvalidMusicNameException | UnavailableGameScoreException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ImageRecognitionFailException();
        }

        //return result;
    }

    @PostMapping(value = "/preliminary/upper")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveUpperRecord(String cardName, MultipartHttpServletRequest request) {
        System.out.println("The contender called " + cardName + " try to submit records!");
        String result1 = "", result2 = "";
        try {
            List<Contender> contenderWithCardName = ctdRepo.findByCardName(cardName);
            if (contenderWithCardName.isEmpty() || !contenderWithCardName.get(0).getUpper()) {
                throw new IncorrectContenderInfoException("Dancer name or division is incorrect.");
            }
            cardName = cardName.replace(".", "_"); // "." 때문에 opencv에서 잘못 인식함
            Part filePart1 = request.getPart("upper1");
            if (filePart1 != null) {
                String fileName1 = cardName + "_" + filePart1.getSubmittedFileName();
                result1 = imgService.recognizeImageData(fileName1, filePart1.getInputStream(), "upper");
                checkValidity(result1);
            }

            Part filePart2 = request.getPart("upper2");
            if (filePart2 != null) {
                String fileName2 = cardName + "_" + filePart2.getSubmittedFileName();
                result2 = imgService.recognizeImageData(fileName2, filePart2.getInputStream(), "upper");
                checkValidity(result2);
            }

            // 도출된 점수를 DB에 반영 - "upper1_2048"
            String[] scoreInfo = {result1, result2};
            updateScore(contenderWithCardName.get(0), scoreInfo);

        } catch (IncorrectContenderInfoException | InvalidImageFileException |
                InvalidMusicNameException | UnavailableGameScoreException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ImageRecognitionFailException();
        }

        //return result;
    }

    private void checkValidity(String result) {
        if (result.equals("InvalidImageError")) {
            throw new InvalidImageFileException();
        }
        if (result.equals("InvalidMusicError")) {
            throw new InvalidMusicNameException();
        }
        if (result.equals("UnavailableGameScoreError")) {
            throw new UnavailableGameScoreException();
        }
        if (result.equals("InvalidDifficultyError")) {
            throw new InvalidDifficultyException();
        }
    }

    private void updateScore(Contender contender, String[] scoreInfo) {
        Integer prevScore;
        for (String si : scoreInfo) {
            if (si.contains("_")) {
                String[] parse = si.split("_");
                String music = parse[0];
                Integer score = Integer.parseInt(parse[1]);

                switch (music) {
                    case "lower1":
                        prevScore = contender.getLowerTrack1();
                        if (score > prevScore) {
                            contender.setLowerTrack1(score);
                            contender.setLowerTotal(score + contender.getLowerTrack2());
                            contender.setLowerUpdateDate(LocalDateTime.now());
                        }
                        break;
                    case "lower2":
                        prevScore = contender.getLowerTrack2();
                        if (score > prevScore) {
                            contender.setLowerTrack2(score);
                            contender.setLowerTotal(score + contender.getLowerTrack1());
                            contender.setLowerUpdateDate(LocalDateTime.now());
                        }
                        break;
                    case "upper1":
                        prevScore = contender.getUpperTrack1();
                        if (score > prevScore) {
                            contender.setUpperTrack1(score);
                            contender.setUpperTotal(score + contender.getUpperTrack2());
                            contender.setUpperUpdateDate(LocalDateTime.now());
                        }
                        break;
                    case "upper2":
                        prevScore = contender.getUpperTrack2();
                        if (score > prevScore) {
                            contender.setUpperTrack2(score);
                            contender.setUpperTotal(score + contender.getUpperTrack1());
                            contender.setUpperUpdateDate(LocalDateTime.now());
                        }
                        break;
                }
            }
        }

        ctdRepo.save(contender);
    }
}
