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

    public static String ALLATORIxDEMO(String a) {
        final int n = 5 << 4 ^ (3 << 2 ^ 0x1);
        final int n2 = 2 << 3 ^ (0x3 ^ 0x5);
        final int length = (a = a).length();
        final char[] array = new char[length];
        int n3;
        int i = n3 = length - 1;
        final char[] array2 = array;
        final char c = (char)n2;
        final int n4 = n;
        while (i >= 0) {
            final char[] array3 = array2;
            final String s = a;
            final int n5 = n3;
            final char char1 = s.charAt(n5);
            --n3;
            array3[n5] = (char)(char1 ^ n4);
            if (n3 < 0) {
                break;
            }
            final char[] array4 = array2;
            final String s2 = a;
            final int n6 = n3--;
            array4[n6] = (char)(s2.charAt(n6) ^ c);
            i = n3;
        }
        return new String(array2);
    }

}
