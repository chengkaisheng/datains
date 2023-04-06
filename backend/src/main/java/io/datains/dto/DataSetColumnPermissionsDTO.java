package io.datains.dto;

import java.util.List;

/**
 * @Author Mr.zhang
 * @Date: 2023/03/29/ 17:20
 * @Description
 */
public class DataSetColumnPermissionsDTO extends DatasetColumnPermissions {
    private String datasetName;
    private String authTargetName;
    private List<Long> authTargetIds;

    public DataSetColumnPermissionsDTO() {
    }

    public String getDatasetName() {
        return this.datasetName;
    }

    public String getAuthTargetName() {
        return this.authTargetName;
    }

    public List<Long> getAuthTargetIds() {
        return this.authTargetIds;
    }

    public void setDatasetName(String datasetName) {
        this.datasetName = datasetName;
    }

    public void setAuthTargetName(String authTargetName) {
        this.authTargetName = authTargetName;
    }

    public void setAuthTargetIds(List<Long> authTargetIds) {
        this.authTargetIds = authTargetIds;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof DataSetColumnPermissionsDTO)) {
            return false;
        } else {
            DataSetColumnPermissionsDTO other = (DataSetColumnPermissionsDTO)o;
            if (!other.canEqual(this)) {
                return false;
            } else {
                label47: {
                    Object this$datasetName = this.getDatasetName();
                    Object other$datasetName = other.getDatasetName();
                    if (this$datasetName == null) {
                        if (other$datasetName == null) {
                            break label47;
                        }
                    } else if (this$datasetName.equals(other$datasetName)) {
                        break label47;
                    }

                    return false;
                }

                Object this$authTargetName = this.getAuthTargetName();
                Object other$authTargetName = other.getAuthTargetName();
                if (this$authTargetName == null) {
                    if (other$authTargetName != null) {
                        return false;
                    }
                } else if (!this$authTargetName.equals(other$authTargetName)) {
                    return false;
                }

                Object this$authTargetIds = this.getAuthTargetIds();
                Object other$authTargetIds = other.getAuthTargetIds();
                if (this$authTargetIds == null) {
                    if (other$authTargetIds != null) {
                        return false;
                    }
                } else if (!this$authTargetIds.equals(other$authTargetIds)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(Object other) {
        return other instanceof DataSetColumnPermissionsDTO;
    }

    public int hashCode() {
        //int PRIME = true;
        int result = 1;
        Object $datasetName = this.getDatasetName();
         result = result * 59 + ($datasetName == null ? 43 : $datasetName.hashCode());
        Object $authTargetName = this.getAuthTargetName();
        result = result * 59 + ($authTargetName == null ? 43 : $authTargetName.hashCode());
        Object $authTargetIds = this.getAuthTargetIds();
        result = result * 59 + ($authTargetIds == null ? 43 : $authTargetIds.hashCode());
        return result;
    }

    public String toString() {
        return "DataSetColumnPermissionsDTO(datasetName=" + this.getDatasetName() + ", authTargetName=" + this.getAuthTargetName() + ", authTargetIds=" + this.getAuthTargetIds() + ")";
    }
}
