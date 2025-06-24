const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080"
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || "local.xxxxxx"
const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL || "https://xxxxxx.bitrix24.vn"
const domain = import.meta.env.VITE_DOMAIN || "https://xxxxxx.bitrix24.vn"

export function installApp(id = CLIENT_ID, redirectUri = REDIRECT_URL) {
  const installUrl = `${domain}/oauth/authorize?client_id=${encodeURIComponent(id)}&redirect_uri=${encodeURIComponent(redirectUri)}`
  window.location.href = installUrl
}

// function get list contact of bitrix24
export function getContacts() {
  const url = `${baseUrl}/contacts`
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error)
      throw error
    })
}

export function createContact(contact) {
  const url = `${baseUrl}/contacts/add`
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(contact),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create contact")
      }
    })
    .catch((error) => {
      console.error("Create contact error:", error)
      throw error
    })
}

export function updateContact(contact, deletedItems) {
  const url = `${baseUrl}/contacts/${contact.id}`
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      contact: contact,
      deletedPhones: deletedItems.phones,
      deletedEmails: deletedItems.emails,
      deleteWebsites: deletedItems.websites
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update contact")
      }
    })
    .catch((error) => {
      console.error("Update contact error:", error)
      throw error
    })
}

export function deleteContact(contactId) {
  const url = `${baseUrl}/contacts/${contactId}`
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete contact")
      }
    })
    .catch((error) => {
      console.error("Delete contact error:", error)
      throw error
    })
}
