package com.stulti.go4thetop;

import retrofit2.Call;
import retrofit2.http.*;

import java.util.Collection;

public interface PreliminaryEntryApi {

    // The path where we expect the VideoSvc to live
    public static final String Entry_API_PATH = "/entry";

    /*
    https://stackoverflow.com/questions/32269064/unable-to-create-call-adapter-for-class-example-simple
    Retrofit2로 넘어가면서 Call<>을 씌워야하도록 바뀌었다
    */
    @GET(Entry_API_PATH)
    public Call<Collection<Contender>> getContenderList();

    @POST(Entry_API_PATH)
    public Call<Contender> addContender(@Body Contender ctd);
    //FIXME: 여기도 잘못 쓴듯?

    @GET(Entry_API_PATH + "/{id}")
    public Contender getContenderById(@Path("id") long id);

    @GET(Entry_API_PATH + "/{mail}")
    public Contender getContenderByMail(@Path("mail") String mail);

    @GET(Entry_API_PATH + "/search/findByMail")
    public Collection<Contender> findByMail(@Query("mail") String mail);
}
