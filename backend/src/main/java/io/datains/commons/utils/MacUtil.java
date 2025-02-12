package io.datains.commons.utils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 * @Author Mr.zhang
 * @Date: 2022/04/11/ 14:19
 * @Description
 */
public class MacUtil {
    private static final String mac = "/opt/datains/hostinfo/address";

    /**
     * 获取当前所用ip的mac地址
     * @return
     */
    public static String getCurrentIpLocalMac(){
        InetAddress ia = null;
        try {
            ia = InetAddress.getLocalHost();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }

        byte[] mac = new byte[0];
        try {
            // NetworkInterface.getByInetAddress(ia) 根据ip信息获取网卡信息
            mac = NetworkInterface.getByInetAddress(ia).getHardwareAddress();
        } catch (SocketException e) {
            e.printStackTrace();
        }

        StringBuffer sb = new StringBuffer("");
        for(int i=0; i<mac.length; i++) {
            if(i!=0) {
                sb.append("-");
            }
            //字节转换为整数
            int temp = mac[i]&0xff;
            // 把无符号整数参数所表示的值转换成以十六进制表示的字符串
            String str = Integer.toHexString(temp);
            if(str.length()==1) {
                sb.append("0"+str);
            }else {
                sb.append(str);
            }
        }

        return sb.toString();
    }

    /**
     * 获取本地所有mac文件
     * @return
     */
    public static List<String> getAllLocalMac() {
        // 使用set集合，避免重复
        Set<String> macs = new HashSet<>();
        try {
            Enumeration<NetworkInterface> enumeration = NetworkInterface.getNetworkInterfaces();
            while (enumeration.hasMoreElements()) {
                StringBuilder stringBuffer = new StringBuilder();
                NetworkInterface networkInterface = enumeration.nextElement();
                if (networkInterface != null) {
                    byte[] bytes = networkInterface.getHardwareAddress();
                    if (bytes != null) {
                        for (int i = 0; i < bytes.length; i++) {
                            if (i != 0) {
                                stringBuffer.append("-");
                            }
                            // 字节转换为整数
                            int tmp = bytes[i] & 0xff;
                            // 把无符号整数参数所表示的值转换成以十六进制表示的字符串
                            String str = Integer.toHexString(tmp);
                            if (str.length() == 1) {
                                stringBuffer.append("0").append(str);
                            } else {
                                stringBuffer.append(str);
                            }
                        }
                        String mac = stringBuffer.toString().toLowerCase()
                                .replace("-", "")
                                .replace(":", "");
                        macs.add(mac);
                    }
                }
            }
            //获取宿主机的mac地址
            Map<String, String> map = estimate();
            if (map.get("code").equals("200")) {
                String mac = map.get("mac").toLowerCase()
                        .replace("-", "")
                        .replace(":", "");
                macs.add(mac);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // Set 转 List
        return new ArrayList<>(macs);
    }
    public static Map<String, String> estimate() {
        String os = System.getProperty("os.name");
        //Windows操作系统
        if (os != null && os.toLowerCase().startsWith("windows")) {
            Map<String, String> map = new HashMap<>();
            String currentIpLocalMac = getCurrentIpLocalMac();
            map.put("code", "200");
            map.put("mac", currentIpLocalMac);
            return map;
        } else {//Linux操作系统
            return linuxGetMac();
        }
    }
    public static  Map<String, String> linuxGetMac() {
        try {
            Map<String, String> map = new HashMap<>();
            String fileName = mac;
            Path path = Paths.get(fileName);
            byte[] bytes = Files.readAllBytes(path);
            List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
            if (IsNullUtils.isNotNull(allLines.size())) {
                map.put("code", "200");
                map.put("mac", allLines.get(0));
                return map;
            }
            map.put("code", "500");
            return map;
        } catch (Exception e) {
            Map<String, String> map = new HashMap<>();
            map.put("code", "500");
            return map;
        }
    }
}
