import ch.qos.logback.classic.Level;
import no.nav.brukerdialog.security.jaspic.OidcAuthModule;
import no.nav.brukerdialog.security.oidc.provider.IssoOidcProvider;
import no.nav.common.auth.LoginFilter;
import no.nav.common.auth.LoginProvider;
import no.nav.sbl.dialogarena.common.jetty.Jetty;

import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.List;

import static java.lang.Boolean.TRUE;
import static java.lang.System.*;
import static java.util.Collections.singletonList;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.JettyBuilder;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;
import static no.nav.sbl.util.LogUtils.setGlobalLogLevel;

public class Main {
    public static void main(String... args) throws Exception {
        getenv().forEach(System::setProperty);
        setProperty("OIDC_REDIRECT_URL", getProperty("VEILARBLOGIN_REDIRECT_URL_URL"));
        setProperty("disable.metrics.report", TRUE.toString());
        setGlobalLogLevel(Level.INFO);
        JettyBuilder jettyBuilder = usingWar(new File("/app"))
                .at("/fastlege")
                .port(8080)
                .disableAnnotationScanning();
        configureForJaspic(jettyBuilder, singletonList("/internal/.*"));
        Jetty jetty = jettyBuilder.buildJetty();
        jetty.context.setClassLoader(URLClassLoader.newInstance(new URL[0]));
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureForJaspic(JettyBuilder jettyBuilder, List<String> ubeskyttet) {
        List<LoginProvider> loginProviders = singletonList(new OidcAuthModule(singletonList(new IssoOidcProvider())));
        jettyBuilder.addFilter(new LoginFilter(loginProviders, ubeskyttet));
    }
}
