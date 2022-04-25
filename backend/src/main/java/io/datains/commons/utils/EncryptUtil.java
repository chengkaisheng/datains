package io.datains.commons.utils;



import cn.hutool.core.codec.Base64;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.Vector;

public class EncryptUtil {
    public static final String MD5 = "MD5";
    public static final String SHA1 = "SHA1";
    public static final String HmacMD5 = "HmacMD5";
    public static final String HmacSHA1 = "HmacSHA1";
    public static final String DES = "DES";
    public static final String AES = "AES";

    /**编码格式；默认使用uft-8*/
    public String charset = "UTF-8";
    /**DES*/
    public int keysizeDES = 0;
    /**AES*/
    public int keysizeAES = 128;

    public static EncryptUtil me;

    private EncryptUtil(){
        //单例
    }
    //双重锁
    public static EncryptUtil getInstance(){
        if (me==null) {
            synchronized (EncryptUtil.class) {
                if(me == null){
                    me = new EncryptUtil();
                }
            }
        }
        return me;
    }

    /**
     * 使用MessageDigest进行单向加密（无密码）
     * @param res 被加密的文本
     * @param algorithm 加密算法名称
     * @return
     */
    private String messageDigest(String res, String algorithm){
        try {
            MessageDigest md = MessageDigest.getInstance(algorithm);
            byte[] resBytes = charset==null?res.getBytes():res.getBytes(charset);
            return base64(md.digest(resBytes));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 使用KeyGenerator进行单向/双向加密（可设密码）
     * @param res 被加密的原文
     * @param algorithm  加密使用的算法名称
     * @param key 加密使用的秘钥
     * @return
     */
    private String keyGeneratorMac(String res, String algorithm, String key){
        try {
            SecretKey sk = null;
            if (key==null) {
                KeyGenerator kg = KeyGenerator.getInstance(algorithm);
                sk = kg.generateKey();
            }else {
                byte[] keyBytes = charset==null?key.getBytes():key.getBytes(charset);
                sk = new SecretKeySpec(keyBytes, algorithm);
            }
            Mac mac = Mac.getInstance(algorithm);
            mac.init(sk);
            byte[] result = mac.doFinal(res.getBytes());
            return base64(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 使用KeyGenerator双向加密，DES/AES，注意这里转化为字符串的时候是将2进制转为16进制格式的字符串，不是直接转，因为会出错
     * @param res 加密的原文
     * @param algorithm 加密使用的算法名称
     * @param key  加密的秘钥
     * @param keysize
     * @param isEncode
     * @return
     */
    private String keyGeneratorES(String res, String algorithm, String key, int keysize, boolean isEncode){
        try {
            KeyGenerator kg = KeyGenerator.getInstance(algorithm);
            if (keysize == 0) {
                byte[] keyBytes = charset==null?key.getBytes():key.getBytes(charset);
                SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
                secureRandom.setSeed(keyBytes);
                kg.init(secureRandom);
            }else if (key==null) {
                kg.init(keysize);
            }else {
                byte[] keyBytes = charset==null?key.getBytes():key.getBytes(charset);
                SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
                secureRandom.setSeed(keyBytes);
                kg.init(keysize, secureRandom);
            }
            SecretKey sk = kg.generateKey();
            SecretKeySpec sks = new SecretKeySpec(sk.getEncoded(), algorithm);
            Cipher cipher = Cipher.getInstance(algorithm);
            if (isEncode) {
                cipher.init(Cipher.ENCRYPT_MODE, sks);
                byte[] resBytes = charset==null?res.getBytes():res.getBytes(charset);
                return parseByte2HexStr(cipher.doFinal(resBytes));
            }else {
                cipher.init(Cipher.DECRYPT_MODE, sks);
                return new String(cipher.doFinal(parseHexStr2Byte(res)));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String base64(byte[] res){
        return Base64.encode(res);
    }

    /**将二进制转换成16进制 */
    public static String parseByte2HexStr(byte buf[]) {
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < buf.length; i++) {
            String hex = Integer.toHexString(buf[i] & 0xFF);
            if (hex.length() == 1) {
                hex = '0' + hex;
            }
            sb.append(hex.toUpperCase());
        }
        return sb.toString();
    }
    /**将16进制转换为二进制*/
    public static byte[] parseHexStr2Byte(String hexStr) {
        if (hexStr.length() < 1)
            return null;
        byte[] result = new byte[hexStr.length()/2];
        for (int i = 0;i< hexStr.length()/2; i++) {
            int high = Integer.parseInt(hexStr.substring(i*2, i*2+1), 16);
            int low = Integer.parseInt(hexStr.substring(i*2+1, i*2+2), 16);
            result[i] = (byte) (high * 16 + low);
        }
        return result;
    }

    /**
     * md5加密算法进行加密（不可逆）
     * @param res 需要加密的原文
     * @return
     */
    public String MD5(String res) {
        return messageDigest(res, MD5);
    }

    /**
     * md5加密算法进行加密（不可逆）
     * @param res  需要加密的原文
     * @param key  秘钥
     * @return
     */
    public String MD5(String res, String key) {
        return keyGeneratorMac(res, HmacMD5, key);
    }

    /**
     * 使用SHA1加密算法进行加密（不可逆）
     * @param res 需要加密的原文
     * @return
     */
    public String SHA1(String res) {
        return messageDigest(res, SHA1);
    }

    /**
     * 使用SHA1加密算法进行加密（不可逆）
     * @param res 需要加密的原文
     * @param key 秘钥
     * @return
     */
    public String SHA1(String res, String key) {
        return keyGeneratorMac(res, HmacSHA1, key);
    }

    /**
     * 使用DES加密算法进行加密（可逆）
     * @param res 需要加密的原文
     * @param key 秘钥
     * @return
     */
    public String DESencode(String res, String key) {
        return keyGeneratorES(res, DES, key, keysizeDES, true);
    }

    /**
     * 对使用DES加密算法的密文进行解密（可逆）
     * @param res 需要解密的密文
     * @param key 秘钥
     * @return
     */
    public String DESdecode(String res, String key) {
        return keyGeneratorES(res, DES, key, keysizeDES, false);
    }

    /**
     * 使用AES加密算法经行加密（可逆）
     * @param res 需要加密的密文
     * @param key 秘钥
     * @return
     */
    public String AESencode(String res, String key) {
        return keyGeneratorES(res, AES, key, keysizeAES, true);
    }

    /**
     * 对使用AES加密算法的密文进行解密
     * @param res 需要解密的密文
     * @param key 秘钥
     * @return
     */
    public String AESdecode(String res, String key) {
        return keyGeneratorES(res, AES, key, keysizeAES, false);
    }
    /**
     * 使用异或进行加密
     * @param res 需要加密的密文
     * @param key 秘钥
     * @return
     */
    public String XORencode(String res, String key) {
        byte[] bs = res.getBytes();
        for (int i = 0; i < bs.length; i++) {
            bs[i] = (byte) ((bs[i]) ^ key.hashCode());
        }
        return parseByte2HexStr(bs);
    }
    /**
     * 使用异或进行解密
     * @param res 需要解密的密文
     * @param key 秘钥
     * @return
     */
    public String XORdecode(String res, String key) {
        byte[] bs = parseHexStr2Byte(res);
        for (int i = 0; i < bs.length; i++) {
            bs[i] = (byte) ((bs[i]) ^ key.hashCode());
        }
        return new String(bs);
    }
    /**
     * 直接使用异或（第一调用加密，第二次调用解密）
     * @param res 密文
     * @param key 秘钥
     * @return
     */
    public int XOR(int res, String key) {
        return res ^ key.hashCode();
    }
    /**
     * 使用Base64进行加密
     * @param res 密文
     * @return
     */
    public String Base64Encode(String res) {
        return Base64.encode(res.getBytes());
    }
    /**
     * 使用Base64进行解密
     * @param res
     * @return
     */
    public String Base64Decode(String res) {
        return new String(Base64.decode(res));
    }

    public String RetainCodeNM(String res, String key){
        String[] split = key.split(",");
        int i = Integer.parseInt(split[0]) + Integer.parseInt(split[1]);
        if (res.length()>= Integer.parseInt(split[1])){
            String substring = res.substring(0, Integer.parseInt(split[0]));
            String substring2 = res.substring(res.length()- Integer.parseInt(split[1]));
            if (i>res.length()){
                return substring2;
            }else {
                return substring+substring2;
            }
        }
        return res;
    }
    public String RetainCodeXY(String res, String key){
        String[] split = key.split(",");
        try {
            return res.substring(Integer.parseInt(split[0])-1, Integer.parseInt(split[1]));
        }catch (StringIndexOutOfBoundsException e){
            return res;
        }

    }
    public String CoverEnCodeNM(String res, String key){
        String[] split = key.split(",");
        int i1 = res.length() - Integer.parseInt(split[1]);
        String s7 ="";
        String substring = res.substring(Integer.parseInt(split[0]), i1);
        for (int i = 0; i < substring.length(); i++) {
            s7+=split[2];
        }
        return res.replaceAll(substring,s7);
    }
    public String CoverEnCodeYX(String res, String key){
        String[] split = key.split(",");
        String q ="";
        String h ="";
        int i1 = res.length() - Integer.parseInt(split[1]);
        String substring = res.substring(Integer.parseInt(split[0])-1, Integer.parseInt(split[1])>res.length()?res.length(): Integer.parseInt(split[1]));
        for (int i = 0; i < Integer.parseInt(split[0])-1; i++) {
            q+=split[2];
        }
        for (int i = 0; i <i1 ; i++) {
            h+=split[2];
        }
        return q+substring+h;
    }
    public String SpecialCodeHead(String res, String key){
        String t3= "";
        String st="";
        String[] split = key.split(",");
        String[] split1 ;
        if (split[1].equals(".")){
            split1 = res.split("\\.");
        }else {
            split1= res.split(split[1]);
        }
        if (split1.length>1) {
            for (int i = 0; i < split1[0].length(); i++) {
                t3 += split[0];
            }
            for (int i = 0; i < split1.length; i++) {
                if (i!=0){
                    st+=split1[i];
                    if (split1.length-1!=i){
                        st+=split[1];
                    }
                }
            }
            return t3+st;
        }
        return res;
    }

    public String SpecialCodeEnd(String res, String key){
        String[] split = key.split(",");
        String[] split1 ;
        String t3= "";
        if (split[1].equals(".")){
            split1 = res.split("\\.");
        }else {
            split1= res.split(split[1]);
        }
        if (split1.length>1){
            for (int i = 0; i < split1.length; i++) {
                if (i!=0){
                    for (int i2 = 0; i2 < split1[i].length(); i2++) {
                        t3+=split[0];
                    }
                }
            }
        }
        return split1[0]+t3;
    }
    public String CountInteger(String res, String key){
        String[] split = res.split("\\.");
        if (split.length>1){
            if (split[1].length()> Integer.parseInt(key)){
                String substring = split[1].substring(0, Integer.parseInt(key));
                return split[0]+"."+substring;
            }
        }
        return res;
    }
    public String ScatterCode(String res){
        char[] chars1 = res.toCharArray();
        Random r = new Random();
        Vector v = new Vector();
        char[] chars = new char[res.length()+1];
        int count = 0;
        while(count < res.length()){
            int number = r.nextInt(res.length());
            if(!v.contains(number)){
                v.add(number);
                chars[count]=chars1[number];
                System.out.println(number);
                count++;
            }
        }
        return String.valueOf(chars);
    }
    public String MoveCode(String res, String key){
        byte[] utf8s ;
        String[] split = key.split(",");
        try {
            utf8s = res.getBytes("utf8");
            for (int i = 0; i < utf8s.length; i++) {
                int i2 ;
                if (split[0].equals("左移")){
                    i2= Integer.parseInt(String.valueOf(utf8s[i])) << Integer.parseInt(split[1]);
                }else {
                    i2 = Integer.parseInt(String.valueOf(utf8s[i])) >> Integer.parseInt(split[1]);
                }

                utf8s[i]= (byte) i2;
            }
            String str = new String(utf8s, "UTF-8");
            return str;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return res;
    }

    public String DataInteger(String res, String key){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat format2 = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分:ss秒");
        try {
            Date parse = format.parse(res);
            String format1 = format2.format(parse);
            String[] split = format1.split(key);
            return split[0].replaceAll("年","-").replaceAll("月", "-").replaceAll("日", "").replaceAll("时", ":").replaceAll("分", ":").replaceAll("秒",  "");
        } catch (Exception e) {
            e.printStackTrace();
            return res;
        }
    }

}
