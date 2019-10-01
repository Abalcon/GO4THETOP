package com.stulti.go4thetop;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import okhttp3.logging.HttpLoggingInterceptor.Level;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

@RunWith(SpringRunner.class)
@SpringBootTest(properties = "classpath:application-test.properties")
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureMockMvc
public class Go4thetopApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ImageRecognitionService imgService;

    //FIXME: Autowired가 되도록 Bean 설정 필요
    private DummyMailSender mailSender = new DummyMailSender();
    @Autowired
    private MailService testMailService;

    private final String TEST_URL = "http://localhost:9000";
    // HTTP 통신 확인용
    private Level level = Level.BODY;
    private HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor().setLevel(level);
    private OkHttpClient client = new OkHttpClient.Builder().addInterceptor(interceptor).build();
    // 일종의 Mock Client
    private PreliminaryEntryApi entryService = new Retrofit.Builder().baseUrl(TEST_URL)
            .addConverterFactory(GsonConverterFactory.create())
            //.addCallAdapterFactory(RxJava2CallAdapterFactory.create())
            .client(client).build().create(PreliminaryEntryApi.class);

    private Contender testContender = new Contender("extinbase@gmail.com",
            "DJ 스툴티", "디제이스툴티", "Stult-i", "None",
            false, true, true, "AutomationCreator");

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

//    @Test
//    public void registrationTest() throws Exception {
//        mockMvc.perform(post("/entry").content(asJsonString(testContender)).contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk()).andExpect(jsonPath("$.mail").value(testContender.getMail()));
//
//        mockMvc.perform(get("/entry/search/findByMail").param("mail", testContender.getMail()))
//                .andExpect(status().isOk()).andExpect(jsonPath("$[0].mail").value(testContender.getMail()));
//    }
//
//    private static String asJsonString(final Object obj) {
//        try {
//            return new ObjectMapper().writeValueAsString(obj);
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    @Test
//    public void extractScoresFromImagesTest() throws Exception {
//        String testFilePath = "src/test/resources/testimages/";
//        String invalidImageError = "InvalidImageError";
//        String invalidMusicError = "InvalidMusicError";
//
//        String errors = "";
//        StringBuilder sb = new StringBuilder();
//
//        // previously submitted images
//        sb.append(oneImage(testFilePath, "test_upper1_normal1.jpg", "upper", "upper1_1739"));
//        sb.append(oneImage(testFilePath, "test_upper2_normal1.jpg", "upper", "upper2_1500"));
//        sb.append(oneImage(testFilePath, "test_lower1_somelight.jpg", "lower", "lower1_877"));
//        sb.append(oneImage(testFilePath, "test_lower2_somelight.jpg", "lower", "lower2_1128"));
//
//        // e-Amusement App으로 찍은 사진
//        sb.append(oneImage(testFilePath, "test_lower1_app1.jpg", "lower", "lower1_909"));
//        sb.append(oneImage(testFilePath, "test_lower2_app1.jpg", "lower", "lower2_1159"));
//        sb.append(oneImage(testFilePath, "test_upper1_app1.jpg", "upper", "upper1_1769"));
//        sb.append(oneImage(testFilePath, "test_upper2_app1.jpg", "upper", "upper2_1544"));
//
//        sb.append(oneImage(testFilePath, "test_upper1_app2.jpeg", "upper", "upper1_1780"));
//        sb.append(oneImage(testFilePath, "test_upper2_app2.jpeg", "upper", "upper2_1531"));
//        sb.append(oneImage(testFilePath, "test_lower1_app3.jpg", "lower", "lower1_915"));
//        sb.append(oneImage(testFilePath, "test_lower2_app3.jpg", "lower", "lower2_1165"));
//        sb.append(oneImage(testFilePath, "test_upper1_app3.jpg", "upper", "upper1_1772"));
//        sb.append(oneImage(testFilePath, "test_upper2_app3.jpg", "upper", "upper2_1538"));
//
//        sb.append(oneImage(testFilePath, "test_upper1_ok1.jpg", "upper", "upper1_1717"));
//        sb.append(oneImage(testFilePath, "test_upper1_ok2.jpg", "upper", "upper1_1757"));
//
//        errors = sb.toString();
//        assertEquals("", errors);
//    }
//
//    private String oneImage(String filePath, String fileName, String division, String expectedOutput) throws IOException {
//        String fileFullName = filePath + fileName;
//        File file = new File(fileFullName);
//        BufferedImage scoreImage = ImageIO.read(file);
//        ByteArrayOutputStream baos = new ByteArrayOutputStream();
//        ImageIO.write(scoreImage, "jpg", baos);
//        baos.flush();
//        byte[] imageInByte = baos.toByteArray();
//        InputStream is = new ByteArrayInputStream(imageInByte);
//        baos.close();
//        String output = imgService.recognizeImageData(fileName, is, division);
//        //assertEquals(expectedOutput, output);
//        if (output.equals(expectedOutput))
//            return "";
//
//        return "Result for file: " + fileName + "- Expected: " + expectedOutput + " / Actual: " + output + "\n";
//    }
}
