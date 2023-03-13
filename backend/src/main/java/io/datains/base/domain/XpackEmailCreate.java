package io.datains.base.domain;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.util.HtmlUtils;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/11/ 15:56
 * @Description
 */
@Data
public class XpackEmailCreate implements Serializable {
    private XpackEmailTaskRequest request;
    private String emailContent;

    public XpackEmailTaskRequest fillContent() {
        if (StringUtils.isBlank(this.emailContent)) {
            return this.request;
        } else {
            String htmlEscape = HtmlUtils.htmlEscape(this.emailContent);

            byte[] bytes;
            try {
                bytes = htmlEscape.getBytes("UTF-8");
            } catch (UnsupportedEncodingException var4) {
                throw new RuntimeException(var4);
            }

            this.request.setContent(bytes);
            return this.request;
        }
    }

    public XpackEmailCreate() {
    }

    public XpackEmailTaskRequest getRequest() {
        return this.request;
    }

    public String getEmailContent() {
        return this.emailContent;
    }

    public void setRequest(XpackEmailTaskRequest request) {
        this.request = request;
    }

    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }



    protected boolean canEqual(Object other) {
        return other instanceof io.datains.plugins.xpack.email.dto.request.XpackEmailCreate;
    }


    public String toString() {
        return "XpackEmailCreate(request=" + this.getRequest() + ", emailContent=" + this.getEmailContent() + ")";
    }
}
