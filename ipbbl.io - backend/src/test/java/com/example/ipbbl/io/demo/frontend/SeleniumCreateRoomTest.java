package com.example.ipbbl.io.demo.frontend;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SeleniumCreateRoomTest {
    @Autowired
    SeleniumConfig seleniumConfig;

    String url = "http://localhost:8081";

    @BeforeAll
    public void configure() {
        seleniumConfig = new SeleniumConfig();
        seleniumConfig.driver.get(url);
    }

    @AfterAll
    public void destroy() {
        seleniumConfig.driver.close();
    }

    @Test
    public void createRoomAndConnectTwoUsers() throws InterruptedException {
        WebElement username = seleniumConfig.driver.findElement(By.id("username"));
        WebElement submitButton = seleniumConfig.driver.findElement(By.id("submit"));

        username.sendKeys("Mariyan Bitsov");
        submitButton.click();

        WebElement nextPageUsername = seleniumConfig.driver.findElement(By.id("user-list"));

        Thread.sleep(5000);
        Assertions.assertThat(nextPageUsername).isNotNull();
    }
}
