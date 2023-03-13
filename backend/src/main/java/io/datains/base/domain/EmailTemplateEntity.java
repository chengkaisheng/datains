package io.datains.base.domain;

import lombok.Data;

import java.util.Arrays;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 15:00
 * @Description
 */
@Data
public class EmailTemplateEntity {
    private byte[] h;

    private String B;

    private String G;

    private String i;

    private Long ALLATORIxDEMO;

    private String g;

    private Long a;

    public String getPixel() {
        return this.g;
    }

    public Long getTaskId() {
        return this.ALLATORIxDEMO;
    }

    public String getTitle() {
        return this.B;
    }

    public byte[] getContent() {
        return this.h;
    }

    public void setPanelId(String str) {
        this.G = str;
    }


    public void setPixel(String str) {
        this.g = str;
    }

    public int hashCode() {
        int i = 59;
        i = 1;
        Long long_ = getId();
        i = i * 59 + ((long_ == null) ? 43 : long_.hashCode());
        long_ = getTaskId();
        i = i * 59 + ((long_ == null) ? 43 : long_.hashCode());
        String str = getTitle();
        i = i * 59 + ((str == null) ? 43 : str.hashCode());
        str = getPanelId();
        i = i * 59 + ((str == null) ? 43 : str.hashCode());
        str = getRecipients();
        i = (i = i * 59 + ((str == null) ? 43 : str.hashCode())) * 59 + Arrays.hashCode(getContent());
        str = getPixel();
        return i = i * 59 + ((str == null) ? 43 : str.hashCode());
    }


    public void setContent(byte[] arrayOfByte) {
        this.h = arrayOfByte;
    }

    protected boolean canEqual(Object object) {
        return object instanceof EmailTemplateEntity;
    }

    public void setTaskId(Long long_) {
        this.ALLATORIxDEMO = long_;
    }

    public void setTitle(String str) {
        this.B = str;
    }

    public void setId(Long long_) {
        this.a = long_;
    }

    public void setRecipients(String str) {
        this.i = str;
    }

    public Long getId() {
        return this.a;
    }

    public String getRecipients() {
        return this.i;
    }

    public String getPanelId() {
        return this.G;
    }

}
