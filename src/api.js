const BASE_URL = "https://notes-api.dicoding.dev/v2";

const createNote = async (title, body) => {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
  return response.json();
};

const getNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes`);
  return response.json();
};

const deleteNote = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

const archiveNote = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  return response.json();
};

const unarchiveNote = async (id) => {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  return response.json();
};

const getArchivedNotes = async () => {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  return response.json();
};

export {
  createNote,
  getNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
  getArchivedNotes,
};
