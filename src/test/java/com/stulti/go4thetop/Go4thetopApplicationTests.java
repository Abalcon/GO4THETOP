package com.stulti.go4thetop;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import okhttp3.logging.HttpLoggingInterceptor.Level;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.io.IOException;
import java.util.Collection;

import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class Go4thetopApplicationTests {

    //    @Autowired
//    private JavaMailSender mailSender;
    //FIXME: Autowired가 되도록 Bean 설정 필요
    private DummyMailSender mailSender = new DummyMailSender();
    @Autowired
    private MailService testMailService;

    private final String TEST_URL = "http://localhost:9000";
    // HTTP 통신 확인용
    Level level = Level.BODY;
    HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor().setLevel(level);
    private OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();
    // 일종의 Mock Client
    private PreliminaryEntryApi entryService = new Retrofit.Builder().baseUrl(TEST_URL)
            .addConverterFactory(GsonConverterFactory.create())
            //.addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .client(client).build().create(PreliminaryEntryApi.class);
    private Contender testContender = new Contender("extinbase@gmail.com",
            "DJ 스툴티", "Stult_i", false, true, "AutomationCreator");
    private Contender testContender2 = new Contender("extinbase@naver.com",
            "DJ 아발컨", "Abalcon", true, false, "FutariUltraCS");

    @Test
    public void contextLoads() {

    }

    /* 테스트 내용
    1. 예선 참가 신청
    CRUD 중에 CR이 웹 사이트에서 가능해야 함 (UD는 수동)
    [1] 참가 신청 Form 제출 시
    - DB에 저장이 되어야 함 (신청 완료 - Create)
    - 정상적으로 신청이 됐을 때 메일 전송이 되어야 함
    [2] (가급적) 참가 신청 Form 작성 중에
    - 중복 신청이 되지 않도록 함 (존재 여부 검증 - Read)
    */

    @Test
    public void registrationTest() throws IOException {
        Contender addedContender = entryService.addContender(testContender).execute().body();
        Collection<Contender> stored = entryService.getContenderList().execute().body();
        System.out.println("Test: " + stored.size() + " - " + stored.toArray()[0]);
        System.out.println(testContender);
        System.out.println(addedContender);
        assertTrue(stored.contains(addedContender));
    }

    @Test
    public void registrationConfirmMailTest() {
        //MailServiceImpl testMailService = new MailServiceImpl();
        //testMailService.setMailSender(mailSender);
        testMailService.sendRegistConfirmMail(testContender);
    }

//    @Test
//    public void registrationConfirmRealMailTest() {
//        MailServiceImpl testMailService = new MailServiceImpl();
//        //testMailService.setMailSender(realMailSender);
//        testMailService.sendRegistConfirmMail(testContender);
//    }

    @Test
    public void entryExistenceCheckTest() throws IOException {
        Contender existingContender = entryService.addContender(testContender2).execute().body();
        Collection<Contender> checkDuplicate = entryService.findByMail("extinbase@naver.com").execute().body();
        assertTrue(checkDuplicate.contains(existingContender));
    }

    /*
    [예선 참가 신청 작업 완료 후 진행]
            2. 예선 기록 제출
    3. 예선 순위 표시
    */
}
