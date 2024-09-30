export const adminAjax = body => {
  return fetch(`${location.origin}/wp-admin/admin-ajax.php`, {
    headers: { 'Accept': 'application/json, text/javascript' },
    method: 'POST',
    body
  })
    .then(res => res.json())
}