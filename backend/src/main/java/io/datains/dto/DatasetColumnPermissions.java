package io.datains.dto;

import java.io.Serializable;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:21
 * @Description
 */
public class DatasetColumnPermissions implements Serializable {
    private String id;
    private String authTargetType;
    private Long authTargetId;
    private String datasetId;
    private Long updateTime;
    private String permissions;
    private static final long serialVersionUID = 1L;

    public DatasetColumnPermissions() {
    }

    public String getId() {
        return this.id;
    }

    public String getAuthTargetType() {
        return this.authTargetType;
    }

    public Long getAuthTargetId() {
        return this.authTargetId;
    }

    public String getDatasetId() {
        return this.datasetId;
    }

    public Long getUpdateTime() {
        return this.updateTime;
    }

    public String getPermissions() {
        return this.permissions;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuthTargetType(String authTargetType) {
        this.authTargetType = authTargetType;
    }

    public void setAuthTargetId(Long authTargetId) {
        this.authTargetId = authTargetId;
    }

    public void setDatasetId(String datasetId) {
        this.datasetId = datasetId;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public void setPermissions(String permissions) {
        this.permissions = permissions;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof DatasetColumnPermissions)) {
            return false;
        } else {
            DatasetColumnPermissions other = (DatasetColumnPermissions)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                Object this$id = this.getId();
                Object other$id = other.getId();
                if (this$id == null) {
                    if (other$id != null) {
                        return false;
                    }
                } else if (!this$id.equals(other$id)) {
                    return false;
                }

                Object this$authTargetType = this.getAuthTargetType();
                Object other$authTargetType = other.getAuthTargetType();
                if (this$authTargetType == null) {
                    if (other$authTargetType != null) {
                        return false;
                    }
                } else if (!this$authTargetType.equals(other$authTargetType)) {
                    return false;
                }

                Object this$authTargetId = this.getAuthTargetId();
                Object other$authTargetId = other.getAuthTargetId();
                if (this$authTargetId == null) {
                    if (other$authTargetId != null) {
                        return false;
                    }
                } else if (!this$authTargetId.equals(other$authTargetId)) {
                    return false;
                }

                label62: {
                    Object this$datasetId = this.getDatasetId();
                    Object other$datasetId = other.getDatasetId();
                    if (this$datasetId == null) {
                        if (other$datasetId == null) {
                            break label62;
                        }
                    } else if (this$datasetId.equals(other$datasetId)) {
                        break label62;
                    }

                    return false;
                }

                label55: {
                    Object this$updateTime = this.getUpdateTime();
                    Object other$updateTime = other.getUpdateTime();
                    if (this$updateTime == null) {
                        if (other$updateTime == null) {
                            break label55;
                        }
                    } else if (this$updateTime.equals(other$updateTime)) {
                        break label55;
                    }

                    return false;
                }

                Object this$permissions = this.getPermissions();
                Object other$permissions = other.getPermissions();
                if (this$permissions == null) {
                    if (other$permissions != null) {
                        return false;
                    }
                } else if (!this$permissions.equals(other$permissions)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof DatasetColumnPermissions;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $id = this.getId();
        result = result * 59 + ($id == null ? 43 : $id.hashCode());
        Object $authTargetType = this.getAuthTargetType();
        result = result * 59 + ($authTargetType == null ? 43 : $authTargetType.hashCode());
        Object $authTargetId = this.getAuthTargetId();
        result = result * 59 + ($authTargetId == null ? 43 : $authTargetId.hashCode());
        Object $datasetId = this.getDatasetId();
        result = result * 59 + ($datasetId == null ? 43 : $datasetId.hashCode());
        Object $updateTime = this.getUpdateTime();
        result = result * 59 + ($updateTime == null ? 43 : $updateTime.hashCode());
        Object $permissions = this.getPermissions();
        result = result * 59 + ($permissions == null ? 43 : $permissions.hashCode());
        return result;
    }

    public String toString() {
        return "DatasetColumnPermissions(id=" + this.getId() + ", authTargetType=" + this.getAuthTargetType() + ", authTargetId=" + this.getAuthTargetId() + ", datasetId=" + this.getDatasetId() + ", updateTime=" + this.getUpdateTime() + ", permissions=" + this.getPermissions() + ")";
    }
}

