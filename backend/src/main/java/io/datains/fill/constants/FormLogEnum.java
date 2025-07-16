package io.datains.fill.constants;

import lombok.Getter;

/**
 * LogEnum
 *
 * @author zhangzihang
 * @since 2025-03-17 11:27
 */
@Getter
public enum FormLogEnum {
    INSERT("INSERT", "用户%s创建了表单%s"),
    UPDATE("UPDATE", "用户%s修改了表单%s"),
    DELETE("DELETE", "用户%s删除了表单%s"),
    DOWNLOAD("DOWNLOAD", "用户%s下载了表单%s"),
    ;

    private final String code;
    private final String desc;

    FormLogEnum(String code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public String toString() {
        return this.code;
    }
}
