package vn.dacbiet;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.github.wumke.RNExitApp.RNExitAppPackage;
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// Step 1; import package:
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new InAppBillingBridgePackage(),
            new FIRMessagingPackage(),
            new RNExitAppPackage(),
            new BackgroundJobPackage(),
            new VectorIconsPackage(),
            // Step 2; register package:
            new GoogleAnalyticsBridgePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
