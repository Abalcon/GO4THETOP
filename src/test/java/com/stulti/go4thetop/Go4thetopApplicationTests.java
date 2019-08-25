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

    /*
    [예선 참가 신청 작업 완료 후 진행]
    2. 예선 기록 제출
    3. 예선 순위 표시
    */

    @Test
    public void extractScoresFromImagesTest() throws Exception {
        String testFilePath = "src/test/resources/testimages/";
        String invalidMusicError = "InvalidMusicError";
        oneImage(testFilePath, "test_blue1.jpg", "lower", invalidMusicError); // Splash Gold
        oneImage(testFilePath, "test_blue1.jpg", "upper", invalidMusicError); // Splash Gold
        oneImage(testFilePath, "test_blue2.jpg", "lower", invalidMusicError); // 1362
        oneImage(testFilePath, "test_blue2.jpg", "upper", invalidMusicError); // 1362
        oneImage(testFilePath, "test_blue3.jpg", "lower", invalidMusicError); // 1494
        oneImage(testFilePath, "test_blue3.jpg", "upper", invalidMusicError); // 1494
        oneImage(testFilePath, "test_blue5.jpg", "lower", invalidMusicError);
        oneImage(testFilePath, "test_blue5.jpg", "upper", invalidMusicError); // EX SCORE 1 503으로 뜨는 듯
        oneImage(testFilePath, "test_blue6.jpg", "lower", invalidMusicError); // 1123
        oneImage(testFilePath, "test_blue7.jpg", "lower", invalidMusicError); // 979
        oneImage(testFilePath, "test_blue8.jpg", "lower", invalidMusicError); // 1241
        oneImage(testFilePath, "test_blue9.jpg", "lower", invalidMusicError); // 902
        oneImage(testFilePath, "test_blue6.jpg", "upper", invalidMusicError); // 1123
        oneImage(testFilePath, "test_blue7.jpg", "upper", invalidMusicError); // 979
        oneImage(testFilePath, "test_blue8.jpg", "upper", invalidMusicError); // 1241
        oneImage(testFilePath, "test_blue9.jpg", "upper", invalidMusicError); // 902
        oneImage(testFilePath, "test_blue10.jpg", "lower", invalidMusicError); // EX SCORE 1 599로 뜨는 듯
        oneImage(testFilePath, "test_blue10.jpg", "upper", invalidMusicError); // EX SCORE 1 599로 뜨는 듯
        oneImage(testFilePath, "test_blue11.jpg", "lower", invalidMusicError); // 915
        oneImage(testFilePath, "test_blue11.jpg", "upper", invalidMusicError); // 915
        oneImage(testFilePath, "test_blue12.jpg", "lower", invalidMusicError); // Splash Gold
        oneImage(testFilePath, "test_blue12.jpg", "upper", invalidMusicError); // Splash Gold
        oneImage(testFilePath, "test_blue14.jpg", "lower", invalidMusicError); // 918
        oneImage(testFilePath, "test_blue15.jpg", "lower", invalidMusicError); // 1775
        oneImage(testFilePath, "test_blue16.jpg", "lower", invalidMusicError); // 1939
        oneImage(testFilePath, "test_blue17.jpg", "lower", invalidMusicError); // 1436
        oneImage(testFilePath, "test_blue19.jpg", "lower", invalidMusicError); // 1256
        oneImage(testFilePath, "test_blue21.jpg", "lower", invalidMusicError); // 1202
        oneImage(testFilePath, "test_blue22.jpg", "lower", invalidMusicError); // 1752
        oneImage(testFilePath, "test_blue23.jpg", "lower", invalidMusicError); // 1130
        oneImage(testFilePath, "test_blue24.jpg", "lower", invalidMusicError); // 903
        oneImage(testFilePath, "test_blue14.jpg", "upper", invalidMusicError); // 918
        oneImage(testFilePath, "test_blue15.jpg", "upper", invalidMusicError); // 1775
        oneImage(testFilePath, "test_blue16.jpg", "upper", invalidMusicError); // 1939
        oneImage(testFilePath, "test_blue17.jpg", "upper", invalidMusicError); // 1436
        oneImage(testFilePath, "test_blue19.jpg", "upper", invalidMusicError); // 1256
        oneImage(testFilePath, "test_blue21.jpg", "upper", invalidMusicError); // 1202
        oneImage(testFilePath, "test_blue22.jpg", "upper", invalidMusicError); // 1752
        oneImage(testFilePath, "test_blue23.jpg", "upper", invalidMusicError); // 1130
        oneImage(testFilePath, "test_blue24.jpg", "upper", invalidMusicError); // 903

        oneImage(testFilePath, "test_blue13.jpg", "lower", invalidMusicError);
        oneImage(testFilePath, "test_blue13.jpg", "upper", "upper2_1443"); // Neverland 1443
        oneImage(testFilePath, "heat_lower1.jpeg", "lower", "lower2_1132"); // Starry Sky 1132
        oneImage(testFilePath, "heat_lower1.jpeg", "upper", invalidMusicError);
        oneImage(testFilePath, "heat_lower2.jpeg", "lower", "lower1_875"); // Unreal 875
        oneImage(testFilePath, "heat_lower2.jpeg", "upper", invalidMusicError);
        oneImage(testFilePath, "heat_upper1.jpeg", "lower", invalidMusicError);
        oneImage(testFilePath, "heat_upper1.jpeg", "upper", "upper1_1737"); // Aerial Flower 1737
        oneImage(testFilePath, "heat_upper2.jpeg", "lower", invalidMusicError);
        oneImage(testFilePath, "heat_upper2.jpeg", "upper", "upper2_1521"); // Neverland 1521 - versus
    }

    private void oneImage(String filePath, String fileName, String division, String expectedOutput) throws IOException {
        String fileFullName = filePath + fileName;
        File file = new File(fileFullName);
        BufferedImage scoreImage = ImageIO.read(file);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(scoreImage, "jpg", baos);
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        InputStream is = new ByteArrayInputStream(imageInByte);
        baos.close();

        String output = imgService.recognizeImageData(fileName, is, division);
        assertEquals(expectedOutput, output);
    }
}
