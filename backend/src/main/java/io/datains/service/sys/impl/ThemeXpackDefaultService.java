package io.datains.service.sys.impl;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 14:22
 * @Description
 */
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;

import io.datains.base.domain.ThemeDto;
import io.datains.base.domain.ThemeItem;
import io.datains.base.domain.ThemeRequest;
import io.datains.base.mapper.ThemeMapper;
import io.datains.service.sys.ThemeXpackService;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ThemeXpackDefaultService implements ThemeXpackService {

    private static final String ALLATORIxDEMO = "ThemeSetting";

    @Resource
    private TransactionDefinition g;

    @Autowired
    private ThemeMapper G;

    @Resource
    private DataSourceTransactionManager h;

    public List<String> components() {
        (new ArrayList<>())

                .add("ThemeSetting");
        return new ArrayList<>();
    }

    public List<ThemeDto> themes() {
        return this.G.selectThemes();
    }

    @Override
    public void save(ThemeRequest paramThemeRequest, MultipartFile paramMultipartFile) {

    }

    public void deleteTheme(int i) {
        TransactionStatus transactionStatus = this.h.getTransaction(this.g);
        try {
            ThemeDto themeDto = this.G.selectOneTheme(i);
            this.G.deleteItems(i);
            this.G.deleteTheme(i);
            if (ObjectUtils.isNotEmpty(themeDto.getStatus()) && themeDto.getStatus().booleanValue())
                this.G.activeFirst();
            this.h.commit(transactionStatus);
            return;
        } catch (Exception exception) {
            this.h.rollback(transactionStatus);
            throw new RuntimeException(exception);
        }
    }

    public List<ThemeItem> queryItems(int i) {
        return this.G.selectItems(i);
    }


}
