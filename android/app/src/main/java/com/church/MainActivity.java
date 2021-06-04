package com.church;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // import this plash setting
import android.os.Bundle; // import this plash setting

public class MainActivity extends ReactActivity {

  @Override
   protected void onCreate(Bundle savedInstanceState) {
       SplashScreen.show(this, R.style.SplashStatusBarTheme);
       super.onCreate(savedInstanceState);
   }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "church";
  }
}
