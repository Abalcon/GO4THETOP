package com.stulti.go4thetop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.Part;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "https://www.go4thetop.net"}, maxAge = 3600)
@Controller
public class HomeController {

    private ContenderRepository ctdRepo;
    private MailService mailService;
    private ImageRecognitionService imgService;

    @Autowired
    public HomeController(ContenderRepository repository, MailService mailService, ImageRecognitionService imageService) {
        this.ctdRepo = repository;
        this.mailService = mailService;
        this.imgService = imageService;
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Email is Already Registered.")
    private class EmailAlreadyRegisteredException extends RuntimeException {

    }

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping(value = "/contenders")
    public @ResponseBody
    List<Contender> contenders() {
        return ctdRepo.findAll();
    }

    @RequestMapping(value = "/entry")
    public @ResponseBody
    List<Contender> getContenders() {
        return ctdRepo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/entry")
    public @ResponseBody
    Contender addContender(@RequestBody Contender ctd) {
        /*
        https://stackoverflow.com/questions/33796218/content-type-application-x-www-form-urlencodedcharset-utf-8-not-supported-for
        Form을 이용한 제출(x-www-form-urlencoded)을 사용하면 @RequestBody로 인식하지 못한다고 한다
        @RequestBody를 제대로 적용하려면, Body를 Application/json 형태로 보내야 한다
        */
        if (!ctdRepo.findByMail(ctd.getMail()).isEmpty()) {
            throw new EmailAlreadyRegisteredException();
        }

        Contender newContender = ctdRepo.save(ctd);
        mailService.sendRegistConfirmMail(newContender);
        return ctd;
    }

    @RequestMapping(value = "/entry/search/findByMail")
    public @ResponseBody
    List<Contender> findByMail(String mail) {
        return ctdRepo.findByMail(mail);
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Contender Information is Incorrect.")
    private class IncorrectContenderInfoException extends RuntimeException {
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

    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "An error occurred in processing your submission.")
    private class ImageRecognitionFailException extends RuntimeException {
        // 이메일 주소, 참가자 이름, 댄서 이름 중에 하나라도 일치하지 않는 경우
    }

    @PostMapping(value = "/preliminary/sample")
    public @ResponseBody
    String resultImageSample(String imgName, HttpServletRequest request) throws IOException {
        String result;
        try {
            result = imgService.recognizeImageData(imgName, request.getInputStream());
            if (result.equals("InvalidImageError")) {
                throw new InvalidImageFileException();
            }
            if (result.equals("InvalidMusicError")) {
                throw new InvalidMusicNameException();
            }

            //TODO:
        } catch (InvalidImageFileException ex) {
            throw new InvalidImageFileException();
        } catch (InvalidMusicNameException ex) {
            throw new InvalidMusicNameException();
        } catch (Exception ex) {
            throw new ImageRecognitionFailException();
        }

        return result;
    }

    @PostMapping(value = "/preliminary/lower")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveLowerRecord(String cardName, MultipartHttpServletRequest request) throws IOException {
        System.out.println("The contender called " + cardName + " try to submit records!");
        String result;
        try {
            if (ctdRepo.findByCardName(cardName).isEmpty()) {
                throw new IncorrectContenderInfoException();
            }
            Part filePart = request.getPart("lower1");
            String fileName = cardName + "_" + filePart.getSubmittedFileName();
            result = imgService.recognizeImageData(fileName, filePart.getInputStream());
            if (result.equals("InvalidImageError")) {
                throw new InvalidImageFileException();
            }
            if (result.equals("InvalidMusicError")) {
                throw new InvalidMusicNameException();
            }

            //TODO:
        } catch (IncorrectContenderInfoException | InvalidImageFileException | InvalidMusicNameException ex) {
            ex.printStackTrace();
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ImageRecognitionFailException();
        }

        //return result;
    }
}
