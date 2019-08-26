package com.stulti.go4thetop;

import retrofit2.Call;
import retrofit2.http.*;

import java.util.Collection;

public interface PreliminaryEntryApi {

    // The path where we expect the VideoSvc to live
    String Entry_API_PATH = "/entry";

    /*
    https://stackoverflow.com/questions/32269064/unable-to-create-call-adapter-for-class-example-simple
    Retrofit2로 넘어가면서 Call<>을 씌워야하도록 바뀌었다
    */
    @GET(Entry_API_PATH)
    public Call<Collection<Contender>> getContenderList();

    @POST(Entry_API_PATH)
    public Call<Contender> addContender(@Body Contender ctd);

    @GET(Entry_API_PATH + "/{id}")
    public Contender getContenderById(@Path("id") long id);

    @GET(Entry_API_PATH + "/{mail}")
    public Contender getContenderByMail(@Path("mail") String mail);

    @GET(Entry_API_PATH + "/search/findByMail")
    public Call<Collection<Contender>> findByMail(@Query("mail") String mail);

    /*
    https://jongmin92.github.io/2018/01/29/Programming/android-retrofit2-okhttp3/
    Retrofit2는 보통 Client 측의 개발을 할때 주로 사용한다
    Server 측에서는 REST API Test용으로 가상의 Client를 만드는 역할을 하게 된다
    */
}
