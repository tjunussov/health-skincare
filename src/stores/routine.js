import { defineStore } from 'pinia'
import { parse } from 'yaml'

const DAY_NAMES = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const useRoutineStore = defineStore('routine', {
  state: () => ({ program: null, checks: {}, selectedDate: new Date().toISOString().slice(0, 10), remindersEnabled: false }),
  getters: {
    tasksForDate: (state) => (date) => {
      if (!state.program) return []
      const day = DAY_NAMES[new Date(`${date}T12:00:00`).getDay()]
      return state.program.schedule
        .filter((slot) => slot.days.includes('daily') || slot.days.includes(day))
        .flatMap((slot) => slot.steps.map((step, index) => ({ ...step, period: slot.period, key: `${slot.period}:${step.id || index}` })))
    },
    isDone: (state) => (date, key) => Boolean(state.checks[`${date}:${key}`])
  },
  actions: {
    toggle(date, key) { this.checks[`${date}:${key}`] = !this.checks[`${date}:${key}`] },
    loadYaml(text) {
      const value = parse(text)
      if (!value?.program?.name || !Array.isArray(value.schedule)) throw new Error('YAML needs program.name and a schedule array.')
      for (const slot of value.schedule) {
        if (!slot.period || !Array.isArray(slot.days) || !Array.isArray(slot.steps)) throw new Error('Every schedule item needs period, days, and steps.')
      }
      this.program = value
    }
  },
  persist: { pick: ['program', 'checks', 'selectedDate', 'remindersEnabled'] }
})
