package io.datains.commons.utils;

/**
 * @Author Mr.zhang
 * @Date: 2022/05/12/ 15:28
 * @Description
 */

import java.io.File;
import java.util.List;
import java.util.function.Function;

import io.dataease.plugins.xpack.email.dto.request.XpackPixelEntity;
import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//public class WebDriverUtil {
//    private static final Logger ALLATORIxDEMO = LoggerFactory.getLogger(WebDriverUtil.class);
//
//    public static byte[] screenshotAsBytes(String a, String str1, XpackPixelEntity xpackPixelEntity, int i) throws Exception {
//        WebDriver webDriver = null;
//        try {
//            return (byte[])((TakesScreenshot)(webDriver = ALLATORIxDEMO(a, str1, xpackPixelEntity, i))).getScreenshotAs(OutputType.BYTES);
//        } catch (Exception exception) {
//            ALLATORIxDEMO.error(exception.getMessage(), exception);
//            throw new RuntimeException(exception);
//        } finally {
//            if (null != webDriver)
//                webDriver.quit();
//        }
//    }
//
//    public static File screenshotAsByFile(String a, String str1, XpackPixelEntity xpackPixelEntity, int i) throws Exception {
//        WebDriver webDriver = null;
//        try {
//            return (File)((TakesScreenshot)(webDriver = ALLATORIxDEMO(a, str1, xpackPixelEntity, i))).getScreenshotAs(OutputType.FILE);
//        } catch (Exception exception) {
//            ALLATORIxDEMO.error(exception.getMessage(), exception);
//            throw new RuntimeException(exception);
//        } finally {
//            if (null != webDriver)
//                webDriver.quit();
//        }
//    }
//
//}
