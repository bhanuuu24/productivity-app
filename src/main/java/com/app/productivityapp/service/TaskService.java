package com.app.productivityapp.service;

import com.app.productivityapp.entity.Task;
import com.app.productivityapp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /* =========================
       ➕ CREATE
    ========================= */
    public Task createTask(Task task) {

        if (task.getType() == null) {
            task.setType("BINARY");
        }

        if ("PROGRESS".equals(task.getType())) {
            int progress = clamp(task.getProgress());
            task.setProgress(progress);
            task.setCompleted(progress == 100);
        } else {
            task.setProgress(0);
            task.setCompleted(false);
        }

        task.setStreak(0);
        task.setLastCompletedDate(null);

        return taskRepository.save(task);
    }

    /* =========================
       📥 READ (NO LOGIC HERE)
    ========================= */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /* =========================
       ✏️ UPDATE (NO STREAK LOGIC)
    ========================= */
    public Task updateTask(Long id, Task newTask) {

        Task oldTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        oldTask.setTitle(newTask.getTitle());
        oldTask.setDescription(newTask.getDescription());
        oldTask.setType(newTask.getType());
        oldTask.setDaily(newTask.isDaily());

        if ("PROGRESS".equals(newTask.getType())) {
            int progress = clamp(newTask.getProgress());
            oldTask.setProgress(progress);
            oldTask.setCompleted(progress == 100);
        } else {
            oldTask.setProgress(0);
        }

        return taskRepository.save(oldTask);
    }

    /* =========================
       ✅ TOGGLE COMPLETED (🔥 STREAK LOGIC HERE)
    ========================= */
    public Task toggleCompleted(Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // NON-DAILY TASK → just toggle
        if (!task.isDaily()) {
            task.setCompleted(!task.isCompleted());
            return taskRepository.save(task);
        }

        LocalDate today = LocalDate.now();
        LocalDate lastDone = task.getLastCompletedDate();

        // ✅ already completed today → do nothing
        if (lastDone != null && lastDone.isEqual(today)) {
            return task;
        }

        // ❌ missed a day → reset streak
        if (lastDone != null && lastDone.isBefore(today.minusDays(1))) {
            task.setStreak(0);
        }

        // 🔥 valid completion → increment once
        task.setStreak(task.getStreak() + 1);
        task.setLastCompletedDate(today);
        task.setCompleted(true);

        return taskRepository.save(task);
    }

    /* =========================
       🗑️ DELETE
    ========================= */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    /* =========================
       🔒 UTIL
    ========================= */
    private int clamp(int value) {
        return Math.max(0, Math.min(value, 100));
    }
}
