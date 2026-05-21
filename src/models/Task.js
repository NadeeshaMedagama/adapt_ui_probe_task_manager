class Task {
  constructor({ id, title, status = 'open', assignedTo = null }) {
    this.id = id
    this.title = title
    this.status = status
    this.assignedTo = assignedTo
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      assignedTo: this.assignedTo
    }
  }
}

module.exports = { Task }

