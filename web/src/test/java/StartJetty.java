import no.nav.sbl.dialogarena.common.jetty.Jetty;

import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;
import static no.nav.sbl.dialogarena.common.jetty.JettyStarterUtils.*;
import static no.nav.sbl.dialogarena.test.SystemProperties.setFrom;

public class StartJetty {
    public static void main(String[] args) throws Exception {
        setFrom("test-environment.properties");
        Jetty jetty = usingWar()
                .at("fastlege")
                .port(8283)
                .disableAnnotationScanning()
                .overrideWebXml()
                .buildJetty();
        jetty.startAnd(first(waitFor(gotKeypress())).then(jetty.stop));
    }
}