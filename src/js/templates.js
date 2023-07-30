//Active
export function generateTableRowActive(note) {
  return `<tr class="table-row table-row-active" id="${note.id}">
              <td id="list-name" required>${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content" required>${note.content}</td>
              <td id="list-date" readonly>${note.dates}</td>
              <td>
                <button class="btn btn-icons btn-edit" data-action="edit" data-id="${note.id}">
                  
                </button>
              </td>
              <td>
                <button class="btn btn-icons btn-archive" data-action="archive" data-id="${note.id}">
                </button>
              </td>
              <td >
                <button class="btn btn-icons btn-delete" data-action="delete" data-id="${note.id}">
                </button>
              </td>
            </tr>`;
}
//Counter
export function generateCountTableRow(type, countActive, countArchived) {
  return `<tr class="table-row table-row-list" >
            <td>${type}</td>
            <td>${countActive}</td>
            <td>${countArchived}</td>
          </tr>`;
}
//Archive
export function createTableRowArchived(note) {
  return `
    <tr class="table-row table-row-archived" id="${note.id}">
              <td id="list-name">${note.name}</td>
              <td>${note.created_at}</td>
              <td id="list-category">${note.category}</td>
              <td id="list-content">${note.content}</td>
              <td id="list-date">${note.dates}</td>
                <td><button class="btn btn-icons btn-archive" data-action="unarchive" data-id="${note.id}">
                </button></td>
            </tr>`;
}
