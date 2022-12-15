package io.datains.dto.datasource;

import org.apache.commons.lang3.StringUtils;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class Dm8Configuration extends JdbcConfiguration{
	private String driver = "dm.jdbc.driver.DmDriver";
    private String extraParams = "serverTimezone=Asia/Shanghai&useUnicode=true&characterEncoding=utf-8";

    public String getJdbc() {
        if(StringUtils.isEmpty(extraParams.trim())){
            return "jdbc:dm://HOSTNAME:PORT/DATABASE"
                    .replace("HOSTNAME", getHost().trim())
                    .replace("PORT", getPort().toString().trim())
                    .replace("DATABASE", getDataBase().trim());
        }else {
            return "jdbc:dm://HOSTNAME:PORT/DATABASE?EXTRA_PARAMS"
                    .replace("HOSTNAME", getHost().trim())
                    .replace("PORT", getPort().toString().trim())
                    .replace("DATABASE", getDataBase().trim())
                    .replace("EXTRA_PARAMS", getExtraParams().trim());
        }
    }

}
