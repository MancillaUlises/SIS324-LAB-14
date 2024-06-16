// Scripts JavaScript adicionales pueden ir aquí
$(document).ready(function() {
    $('#search-btn').click(function() {
      const searchTerm = $('#search-user').val();
      $.ajax({
        url: '/users/search',
        data: { name: searchTerm },
        method: 'GET',
        success: function(response) {
          // Actualice la tabla con los resultados de la búsqueda (se explica más adelante)
          updateUsersTable(response.users);
        },
        error: function(error) {
          console.error('Error al obtener los resultados de la búsqueda:', error);
          // Maneje los errores con elegancia (por ejemplo, muestre un mensaje de error)
        }
      });
    });
  });
  