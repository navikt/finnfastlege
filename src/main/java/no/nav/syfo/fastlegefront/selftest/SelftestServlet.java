package no.nav.syfo.fastlegefront.selftest;


import no.nav.sbl.dialogarena.common.web.selftest.SelfTestBaseServlet;
import no.nav.sbl.dialogarena.types.Pingable;
import org.slf4j.Logger;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;

import static java.lang.System.getProperty;
import static java.net.HttpURLConnection.HTTP_OK;
import static java.util.Arrays.asList;
import static no.nav.sbl.dialogarena.types.Pingable.Ping.feilet;
import static no.nav.sbl.dialogarena.types.Pingable.Ping.lyktes;
import static org.slf4j.LoggerFactory.getLogger;

public class SelftestServlet extends SelfTestBaseServlet {
    private static final Logger logger = getLogger(SelftestServlet.class);

    @Override
    protected Collection<? extends Pingable> getPingables() {
        return asList(
                pingUrl("FASTLEGE_V1_API", getProperty("FASTLEGEAPI_URL") + "/ping")
        );
    }

    private Pingable pingUrl(final String name, final String url) {
        Pingable.Ping.PingMetadata pingMetadata = new Pingable.Ping.PingMetadata(url, name, true);
        return () -> {
            HttpURLConnection connection;
            try {
                connection = (HttpURLConnection) new URL(url).openConnection();
                connection.setConnectTimeout(10000);
                if (connection.getResponseCode() == HTTP_OK) {
                    return lyktes(pingMetadata);
                } else {
                    logger.warn("<<<<<< Could not connect to {} on {}", name, url);
                    return feilet(pingMetadata, new RuntimeException(connection.getResponseCode() + " " + connection.getResponseMessage()));
                }
            } catch (Exception e) {
                logger.warn("<<<<<< Could not connect to {} on {}", name, url, e);
                return feilet(pingMetadata, e);
            }
        };
    }
}
