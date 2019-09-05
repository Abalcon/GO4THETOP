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
        String invalidImageError = "InvalidImageError";
        String invalidMusicError = "InvalidMusicError";

        String errors = "";
        StringBuilder sb = new StringBuilder();
        // Determine the threshold for music matching
//        sb.append(oneImage(testFilePath, "test_blue1.jpg", "lower", invalidMusicError)); // Splash Gold
//        sb.append(oneImage(testFilePath, "test_blue1.jpg", "upper", invalidMusicError)); // Splash Gold
//        sb.append(oneImage(testFilePath, "test_blue2.jpg", "lower", invalidMusicError)); // 1362
//        sb.append(oneImage(testFilePath, "test_blue2.jpg", "upper", invalidMusicError)); // 1362
//        sb.append(oneImage(testFilePath, "test_blue3.jpg", "lower", invalidMusicError)); // 1494
//        sb.append(oneImage(testFilePath, "test_blue3.jpg", "upper", invalidMusicError)); // 1494
//        sb.append(oneImage(testFilePath, "test_blue5.jpg", "lower", invalidMusicError));
//        sb.append(oneImage(testFilePath, "test_blue5.jpg", "upper", invalidMusicError)); // EX SCORE 1 503으로 뜨는 듯
//        sb.append(oneImage(testFilePath, "test_blue6.jpg", "lower", invalidMusicError)); // 1123
//        sb.append(oneImage(testFilePath, "test_blue7.jpg", "lower", invalidMusicError)); // 979
//        sb.append(oneImage(testFilePath, "test_blue8.jpg", "lower", invalidMusicError)); // 1241
//        sb.append(oneImage(testFilePath, "test_blue9.jpg", "lower", invalidMusicError)); // 902
//        sb.append(oneImage(testFilePath, "test_blue6.jpg", "upper", invalidMusicError)); // 1123
//        sb.append(oneImage(testFilePath, "test_blue7.jpg", "upper", invalidMusicError)); // 979
//        sb.append(oneImage(testFilePath, "test_blue8.jpg", "upper", invalidMusicError)); // 1241
//        sb.append(oneImage(testFilePath, "test_blue9.jpg", "upper", invalidMusicError)); // 902
//        sb.append(oneImage(testFilePath, "test_blue10.jpg", "lower", invalidMusicError)); // EX SCORE 1 599로 뜨는 듯
//        sb.append(oneImage(testFilePath, "test_blue10.jpg", "upper", invalidMusicError)); // EX SCORE 1 599로 뜨는 듯
//        sb.append(oneImage(testFilePath, "test_blue11.jpg", "lower", invalidMusicError)); // 915
//        sb.append(oneImage(testFilePath, "test_blue11.jpg", "upper", invalidMusicError)); // 915
//        sb.append(oneImage(testFilePath, "test_blue12.jpg", "lower", invalidMusicError)); // Splash Gold
//        sb.append(oneImage(testFilePath, "test_blue12.jpg", "upper", invalidMusicError)); // Splash Gold
//        sb.append(oneImage(testFilePath, "test_blue14.jpg", "lower", invalidMusicError)); // 918
//        sb.append(oneImage(testFilePath, "test_blue15.jpg", "lower", invalidMusicError)); // 1775
//        sb.append(oneImage(testFilePath, "test_blue16.jpg", "lower", invalidMusicError)); // 1939
//        sb.append(oneImage(testFilePath, "test_blue17.jpg", "lower", invalidMusicError)); // 1436
//        sb.append(oneImage(testFilePath, "test_blue19.jpg", "lower", invalidMusicError)); // 1256
//        sb.append(oneImage(testFilePath, "test_blue21.jpg", "lower", invalidMusicError)); // 1202
//        sb.append(oneImage(testFilePath, "test_blue22.jpg", "lower", invalidMusicError)); // 1752
//        sb.append(oneImage(testFilePath, "test_blue23.jpg", "lower", invalidMusicError)); // 1130
//        sb.append(oneImage(testFilePath, "test_blue24.jpg", "lower", invalidMusicError)); // 903
//        sb.append(oneImage(testFilePath, "test_blue14.jpg", "upper", invalidMusicError)); // 918
//        sb.append(oneImage(testFilePath, "test_blue15.jpg", "upper", invalidMusicError)); // 1775
//        sb.append(oneImage(testFilePath, "test_blue16.jpg", "upper", invalidMusicError)); // 1939
//        sb.append(oneImage(testFilePath, "test_blue17.jpg", "upper", invalidMusicError)); // 1436
//        sb.append(oneImage(testFilePath, "test_blue19.jpg", "upper", invalidMusicError)); // 1256
//        sb.append(oneImage(testFilePath, "test_blue21.jpg", "upper", invalidMusicError)); // 1202
//        sb.append(oneImage(testFilePath, "test_blue22.jpg", "upper", invalidMusicError)); // 1752
//        sb.append(oneImage(testFilePath, "test_blue23.jpg", "upper", invalidMusicError)); // 1130
//        sb.append(oneImage(testFilePath, "test_blue24.jpg", "upper", invalidMusicError)); // 903

        // sample images (small size)
//        sb.append(oneImage(testFilePath, "test_blue13.jpg", "lower", invalidMusicError));
//        sb.append(oneImage(testFilePath, "test_blue13.jpg", "upper", "upper2_1443")); // Neverland 1443
//        sb.append(oneImage(testFilePath, "heat_lower1.jpeg", "lower", "lower2_1132")); // Starry Sky 1132
//        sb.append(oneImage(testFilePath, "heat_lower1.jpeg", "upper", invalidMusicError));
//        sb.append(oneImage(testFilePath, "heat_lower2.jpeg", "lower", "lower1_875")); // Unreal 875
//        sb.append(oneImage(testFilePath, "heat_lower2.jpeg", "upper", invalidMusicError));
//        sb.append(oneImage(testFilePath, "heat_upper1.jpeg", "lower", invalidMusicError));
//        sb.append(oneImage(testFilePath, "heat_upper1.jpeg", "upper", "upper1_1737")); // Aerial Flower 1737
//        sb.append(oneImage(testFilePath, "heat_upper2.jpeg", "lower", invalidMusicError));
//        sb.append(oneImage(testFilePath, "heat_upper2.jpeg", "upper", "upper2_1521")); // Neverland 1521 - versus

        // previously submitted images
// sb.append(oneImage(testFilePath, "test_upper1_toomuchlight.jpg", "upper", invalidMusicError)); // upper1_1784 or invalidMusicError
// sb.append(oneImage(testFilePath, "test_upper2_toomuchlight.jpeg", "upper", invalidMusicError)); // upper2_1557 or invalidMusicError
        sb.append(oneImage(testFilePath, "test_upper1_normal1.jpg", "upper", "upper1_1739"));
        sb.append(oneImage(testFilePath, "test_upper2_normal1.jpg", "upper", "upper2_1500"));
        sb.append(oneImage(testFilePath, "test_lower1_somelight.jpg", "lower", "lower1_877"));
        sb.append(oneImage(testFilePath, "test_lower2_somelight.jpg", "lower", "lower2_1128"));
//        sb.append(oneImage(testFilePath, "test_lower1_normal2.jpg", "lower", "lower1_899"));
//        sb.append(oneImage(testFilePath, "test_lower2_normal2.jpg", "lower", "lower2_1130")); // lower2_1130, 9 matches
//        sb.append(oneImage(testFilePath, "test_lower1_normal3.jpg", "lower", "lower1_919"));
//        sb.append(oneImage(testFilePath, "test_lower2_normal3.jpg", "lower", "lower2_1169"));
//        sb.append(oneImage(testFilePath, "test_lower1_normal4.jpg", "lower", "lower1_921"));
//        sb.append(oneImage(testFilePath, "test_lower2_normal4.jpg", "lower", "lower2_1169"));
//        sb.append(oneImage(testFilePath, "test_lower1_normal5.jpg", "lower", "lower1_918")); // versus
//        sb.append(oneImage(testFilePath, "test_lower2_normal5.jpg", "lower", "lower2_1165"));
//        sb.append(oneImage(testFilePath, "test_lower1_normal6.jpg", "lower", "lower1_800"));
//        sb.append(oneImage(testFilePath, "test_lower2_normal6.jpg", "lower", "lower2_1104"));
//        sb.append(oneImage(testFilePath, "test_lower1_toovague.jpg", "lower", invalidImageError));
//        sb.append(oneImage(testFilePath, "test_lower1_toolarge.jpg", "lower", "lower1_842"));
//        sb.append(oneImage(testFilePath, "test_lower2_toolarge.jpg", "lower", "lower2_1117"));

        // e-Amusement App으로 찍은 사진
        sb.append(oneImage(testFilePath, "test_lower1_app1.jpg", "lower", "lower1_909"));
        sb.append(oneImage(testFilePath, "test_lower2_app1.jpg", "lower", "lower2_1159"));
        sb.append(oneImage(testFilePath, "test_upper1_app1.jpg", "upper", "upper1_1769"));
        sb.append(oneImage(testFilePath, "test_upper2_app1.jpg", "upper", "upper2_1544"));

        sb.append(oneImage(testFilePath, "test_upper1_app2.jpeg", "upper", "upper1_1780"));
        sb.append(oneImage(testFilePath, "test_upper2_app2.jpeg", "upper", "upper2_1531"));
        sb.append(oneImage(testFilePath, "test_lower1_app3.jpg", "lower", "lower1_915"));
        sb.append(oneImage(testFilePath, "test_lower2_app3.jpg", "lower", "lower2_1165"));
        sb.append(oneImage(testFilePath, "test_upper1_app3.jpg", "upper", "upper1_1772"));
        sb.append(oneImage(testFilePath, "test_upper2_app3.jpg", "upper", "upper2_1538"));

        sb.append(oneImage(testFilePath, "test_upper1_ok1.jpg", "upper", "upper1_1717"));
        sb.append(oneImage(testFilePath, "test_upper1_ok2.jpg", "upper", "upper1_1757"));
//        sb.append(oneImage(testFilePath, "test_upper1_ng1.jpg", "upper", invalidMusicError));
//        sb.append(oneImage(testFilePath, "test_upper1_ng2.jpg", "upper", invalidMusicError));

        errors = sb.toString();
        assertEquals("", errors);
    }

    private String oneImage(String filePath, String fileName, String division, String expectedOutput) throws IOException {
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
        //assertEquals(expectedOutput, output);
        if (output.equals(expectedOutput))
            return "";

        return "Result for file: " + fileName + "- Expected: " + expectedOutput + " / Actual: " + output + "\n";
    }
}
