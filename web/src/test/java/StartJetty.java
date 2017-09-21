import no.nav.dialogarena.config.DevelopmentSecurity.ISSOSecurityConfig;
import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static no.nav.dialogarena.config.DevelopmentSecurity.setupISSO;
import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;

public class StartJetty {
    public static void main(String[] args) throws Exception {
        Jetty jetty = setupISSO(usingWar()
                .at("/fastlege")
                .overrideWebXml()
                .loadProperties("/test-environment.properties")
                .port(8283), new ISSOSecurityConfig("oidclogin")
        ).buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}