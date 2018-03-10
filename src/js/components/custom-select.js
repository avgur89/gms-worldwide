import customSelect from 'custom-select';

customSelect('select').forEach((select) => {
  select.container.addEventListener('custom-select:open', function (e) {
    $(select.panel).slideDown(300);
  });
  select.container.addEventListener('custom-select:close', function (e) {
    $(select.panel).slideUp(300);
  });
  select.select.addEventListener('change', function (e) {
    $(select.panel).slideUp(300);
  });
});
