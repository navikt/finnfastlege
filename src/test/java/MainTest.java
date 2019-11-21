import no.nav.brukerdialog.security.jaspic.OidcAuthModule;
import no.nav.brukerdialog.security.oidc.provider.IssoOidcProvider;
import no.nav.common.auth.LoginFilter;
import no.nav.common.auth.LoginProvider;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import no.nav.sbl.dialogarena.common.jetty.Jetty.JettyBuilder;
import no.nav.testconfig.ApiAppTest;

import java.util.List;

import static java.util.Collections.singletonList;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;
import static no.nav.sbl.dialogarena.test.SystemProperties.setFrom;
import static no.nav.testconfig.ApiAppTest.setupTestContext;


public class MainTest {
    private static final String APPLIKASJONS_NAVN = "fastlegefront";

    public static void main(String[] args) throws Exception {
        setupTestContext(ApiAppTest.Config.builder().applicationName(APPLIKASJONS_NAVN).build());
        setFrom("test-environment.properties");
        JettyBuilder jettyBuilder = usingWar()
                .at("fastlege")
                .port(8283)
                .disableAnnotationScanning();
        configureForJaspic(jettyBuilder, singletonList("/internal/.*"));
        Jetty jetty = jettyBuilder.buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }

    private static void configureForJaspic(JettyBuilder jettyBuilder, List<String> ubeskyttet) {
        List<LoginProvider> loginProviders = singletonList(new OidcAuthModule(singletonList(new IssoOidcProvider())));
        jettyBuilder.addFilter(new LoginFilter(loginProviders, ubeskyttet));
    }
}
