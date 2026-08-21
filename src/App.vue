<script setup>
import { computed, onMounted, ref } from 'vue'
import { addDays, format, isToday, parseISO, startOfWeek } from 'date-fns'
import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, Droplets, FileUp, FlaskConical, ShieldCheck, Sparkles } from 'lucide-vue-next'
import { useRoutineStore } from './stores/routine'
import initialYaml from '../prescriptions/template1.yaml?raw'

const store = useRoutineStore()
const fileInput = ref()
const error = ref('')
const weekOffset = ref(0)

onMounted(() => { if (!store.program) store.loadYaml(initialYaml) })

const selected = computed(() => parseISO(store.selectedDate))
const week = computed(() => {
  const start = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset.value * 7)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
})
const tasks = computed(() => store.tasksForDate(store.selectedDate))
const doneCount = computed(() => tasks.value.filter(t => store.isDone(store.selectedDate, t.key)).length)
const progress = computed(() => tasks.value.length ? Math.round(doneCount.value / tasks.value.length * 100) : 0)
const groups = computed(() => ['morning', 'evening'].map(period => ({ period, tasks: tasks.value.filter(t => t.period === period) })).filter(g => g.tasks.length))

function dayProgress(date) {
  const key = format(date, 'yyyy-MM-dd'); const list = store.tasksForDate(key)
  return list.length ? list.filter(t => store.isDone(key, t.key)).length / list.length : 0
}
async function importFile(event) {
  error.value = ''
  try { store.loadYaml(await event.target.files[0].text()) } catch (e) { error.value = e.message }
  event.target.value = ''
}
async function enableReminders() {
  if (!('Notification' in window)) return error.value = 'Notifications are not supported in this browser.'
  const permission = await Notification.requestPermission()
  store.remindersEnabled = permission === 'granted'
  if (store.remindersEnabled) new Notification('FaceTrack reminders are ready', { body: 'Keep the installed app open periodically so it can refresh your routine.' })
}
function iconFor(kind) { return kind === 'protection' ? ShieldCheck : kind === 'active' ? FlaskConical : kind === 'cleanser' ? Droplets : Sparkles }
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div class="brand"><span class="brand-mark"><Sparkles :size="18" /></span><span>FaceTrack</span></div>
      <button class="icon-button" :class="{ active: store.remindersEnabled }" aria-label="Enable reminders" @click="enableReminders"><Bell :size="20" /></button>
    </header>

    <main>
      <section class="hero">
        <div>
          <p class="eyebrow">{{ format(selected, 'EEEE, MMMM d') }}</p>
          <h1>Your skin,<br><em>in rhythm.</em></h1>
          <p class="hero-copy">A calm, consistent routine. One check at a time.</p>
        </div>
        <div class="progress-ring" :style="{ '--progress': `${progress * 3.6}deg` }">
          <div><strong>{{ progress }}%</strong><span>{{ doneCount }}/{{ tasks.length }} done</span></div>
        </div>
      </section>

      <section class="calendar-card">
        <div class="calendar-head">
          <div><CalendarDays :size="18"/><strong>{{ format(week[0], 'MMMM yyyy') }}</strong></div>
          <div><button class="mini-button" @click="weekOffset--"><ChevronLeft :size="18"/></button><button class="today-button" @click="weekOffset=0; store.selectedDate=format(new Date(),'yyyy-MM-dd')">Today</button><button class="mini-button" @click="weekOffset++"><ChevronRight :size="18"/></button></div>
        </div>
        <div class="week-grid">
          <button v-for="day in week" :key="day.toISOString()" class="day" :class="{ selected: format(day,'yyyy-MM-dd') === store.selectedDate, today: isToday(day) }" @click="store.selectedDate=format(day,'yyyy-MM-dd')">
            <span>{{ format(day, 'EEE') }}</span><strong>{{ format(day, 'd') }}</strong>
            <i :style="{ '--day-progress': `${dayProgress(day) * 100}%` }"></i>
          </button>
        </div>
      </section>

      <section class="routine-section">
        <div class="section-title"><div><p class="eyebrow">Today’s practice</p><h2>{{ store.program?.program.name }}</h2></div><span class="status-pill">{{ tasks.length }} steps</span></div>
        <div v-for="group in groups" :key="group.period" class="period-group">
          <div class="period-label"><span>{{ group.period }}</span><i></i></div>
          <button v-for="task in group.tasks" :key="task.key" class="task-card" :class="{ done: store.isDone(store.selectedDate, task.key) }" @click="store.toggle(store.selectedDate, task.key)">
            <span class="task-icon"><component :is="iconFor(task.kind)" :size="21" /></span>
            <span class="task-copy"><strong>{{ task.name }}</strong><small>{{ task.instruction }}</small></span>
            <span class="checkbox"><Check :size="18" /></span>
          </button>
        </div>
        <div v-if="!tasks.length" class="empty-state"><Sparkles :size="28"/><h3>Rest day</h3><p>No steps are scheduled for this day.</p></div>
      </section>

      <section class="program-card">
        <div><p class="eyebrow">Treatment program</p><h3>Bring your own prescription</h3><p>Import a YAML plan prepared by your AI assistant or clinician. Your history stays only on this device.</p></div>
        <button class="import-button" @click="fileInput.click()"><FileUp :size="18"/>Import YAML</button>
        <input ref="fileInput" hidden type="file" accept=".yaml,.yml,text/yaml" @change="importFile">
        <p v-if="error" class="error">{{ error }}</p>
      </section>
      <p class="disclaimer">{{ store.program?.program.disclaimer }}</p>
    </main>
    <nav class="bottom-nav"><span class="active"><Check :size="19"/>Today</span><span><CalendarDays :size="19"/>Week</span><span @click="fileInput.click()"><FileUp :size="19"/>Program</span></nav>
  </div>
</template>
