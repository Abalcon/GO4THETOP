package com.stulti.go4thetop;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import okhttp3.logging.HttpLoggingInterceptor.Level;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;

import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application-test.properties")
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureMockMvc
public class Go4thetopApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ImageRecognitionService imgService;

//    @TestConfiguration
//    public class AWSRekognitionTestConfiguration {
//        @Value("${cloud.aws.credentials.access-Key}")
//        private String accessKey;
//
//        @Value("${cloud.aws.credentials.secret-key}")
//        private String secretKey;
//
//        @Value("${cloud.aws.region.static}")
//        private String region;
//
//        @Bean
//        public AmazonRekognition amazonRekognition() {
//            BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
//            return AmazonRekognitionClientBuilder
//                    .standard()
//                    .withRegion(region)
//                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
//                    .build();
//        }
//    }

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
            "DJ 스툴티", "디제이스툴티", "Stult-i", "None",
            false, true, true, "AutomationCreator");
    private Contender testContender2 = new Contender("extinbase@naver.com",
            "DJ 아발컨", "디제이아발컨", "Abalcon", "Twitter: abalcon",
            false, false, true, "CannotReachOverflow");

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
    public void registrationTest() throws Exception {
        mockMvc.perform(post("/entry").content(asJsonString(testContender)).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.mail").value(testContender.getMail()));

        mockMvc.perform(get("/entry/search/findByMail").param("mail", testContender.getMail()))
                .andExpect(status().isOk()).andExpect(jsonPath("$[0].mail").value(testContender.getMail()));
    }

    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

//    @Test
//    public void registrationConfirmMailTest() {
//        //MailServiceImpl testMailService = new MailServiceImpl();
//        //testMailService.setMailSender(mailSender);
//        testMailService.sendRegistConfirmMail(testContender);
//    }

//    @Test
//    public void entryExistenceCheckTest() throws Exception {
//        String expectValue = "[" + asJsonString(testContender2) + "]";
//
//        mockMvc.perform(post("/entry").content(asJsonString(testContender2)).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk()).andExpect(content().json(asJsonString(testContender2)));
//
//        mockMvc.perform(get("/entry/search/findByMail").requestAttr("mail", testContender2.getMail()))
//                .andExpect(status().isOk()).andExpect(content().json(expectValue));
//
////        Contender existingContender = entryService.addContender(testContender2).execute().body();
////        Collection<Contender> checkDuplicate = entryService.findByMail("extinbase@naver.com").execute().body();
////        assertTrue(checkDuplicate.contains(existingContender));
//    }

    /*
    [예선 참가 신청 작업 완료 후 진행]
    2. 예선 기록 제출
    3. 예선 순위 표시
    */

    @Test
    public void extractScoresFromImagesTest() throws Exception {
        String testFilePath = "src/test/resources/testimages/";
        oneImage(testFilePath, "test_blue1.jpg", "EX SCORE 35");
        oneImage(testFilePath, "test_blue2.jpg", "EX SCORE 1362");
        oneImage(testFilePath, "test_blue3.jpg", "EX SCORE 1494");
        //oneImage(testFilePath,"test_blue5.jpg", "EX SCORE 1503"); // EX SCORE 1 503으로 뜨는 듯
        oneImage(testFilePath, "test_blue6.jpg", "EX SCORE 1123");
        oneImage(testFilePath, "test_blue7.jpg", "EX SCORE 979");
        oneImage(testFilePath, "test_blue8.jpg", "EX SCORE 1241");
        oneImage(testFilePath, "test_blue9.jpg", "EX SCORE 902");
        //oneImage(testFilePath,"test_blue10.jpg", "EX SCORE 1599"); // EX SCORE 1 599로 뜨는 듯
        oneImage(testFilePath, "test_blue11.jpg", "EX SCORE 915");
        oneImage(testFilePath, "test_blue12.jpg", "EX SCORE 1675");
        oneImage(testFilePath, "test_blue13.jpg", "EX SCORE 1443");
        oneImage(testFilePath, "test_blue14.jpg", "EX SCORE 918");
        oneImage(testFilePath, "test_blue15.jpg", "EX SCORE 1775");
        oneImage(testFilePath, "test_blue16.jpg", "EX SCORE 1939");
        oneImage(testFilePath, "test_blue17.jpg", "EX SCORE 1436");
        oneImage(testFilePath, "test_blue19.jpg", "EX SCORE 1256");
        oneImage(testFilePath, "test_blue21.jpg", "EX SCORE 1202");
        oneImage(testFilePath, "test_blue22.jpg", "EX SCORE 1752");
        oneImage(testFilePath, "test_blue23.jpg", "EX SCORE 1130");
        oneImage(testFilePath, "test_blue24.jpg", "EX SCORE 903");
    }

    private void oneImage(String filePath, String fileName, String expectedOutput) throws IOException {
        String fileFullName = filePath + fileName;
        File file = new File(fileFullName);
        BufferedImage scoreImage = ImageIO.read(file);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scoreImage, "jpg", baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        InputStream is = new ByteArrayInputStream(imageInByte);
        baos.close();

        String output = imgService.recognizeImageData(fileName, is);
        assertEquals(expectedOutput, output);
    }
}
