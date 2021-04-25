package com.example.ipbbl.io.demo;

import com.example.ipbbl.io.demo.models.DrawingRoom;
import com.example.ipbbl.io.demo.repositories.DrawingRoomRepository;
import com.example.ipbbl.io.demo.repositories.LanguageRepository;
import com.example.ipbbl.io.demo.repositories.WordRepository;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.doReturn;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
@AutoConfigureMockMvc
class ApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    DrawingRoomRepository drawingRoomRepository;

    @Test
    void testDrawingRoomUpdate() throws Exception {
        DrawingRoom drawingRoom = new DrawingRoom("tesf252vfg", 60, 3, "biko");

        doReturn(Optional.of(drawingRoom)).when(drawingRoomRepository).findById((long) 1);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/drawing-room/1", new DrawingRoom(
                "tesf252vfg",
                60,
                3,
                "biko"
        )).contentType(MediaType.APPLICATION_JSON).content(new JSONObject().toString()))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testGetDrawingRoomByUrl() throws Exception {
        DrawingRoom drawingRoom = new DrawingRoom("tesf252vfg", 60, 3, "biko");

        doReturn(Optional.of(drawingRoom)).when(drawingRoomRepository).findByUrl("tesf252vfg");

        mockMvc.perform(MockMvcRequestBuilders.get("/api/drawing-room/tesf252vfg"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
