(function() {
  if (location.pathname == '/aiding/apply') {
    $("button#save").click(function() {
      localStorage.name = $("#name").val();
      localStorage.sex = $("input:radio:checked").attr("selected", true).val();
      localStorage.nation = $("#nation").val();
      localStorage.birthYear = $("#birth-year").val();
      localStorage.birthMonth = $("#birth-month").val();
      localStorage.school = $("#school").val();
      localStorage.class = $("#class").val();
      localStorage.fee = $("#fee").val();
      localStorage.watcher = $("#watch").val();
      localStorage.age = $("#age").val();
      localStorage.ID = $("#ID-cardNo").val();
      localStorage.work = $("#work").val();
      localStorage.phone = $("#cellphone").val();
      localStorage.else = $("#else").val();
      localStorage.income = $("#income").val();
      localStorage.pocession = $("#pocession").val();
      localStorage.homeAddress = $("#homeAddress").val();
      localStorage.reason = $("#reason").val();
    });
    $(document).ready(function() {
      $("#name").val(localStorage.name);
      if (localStorage.sex == "female") {
        $("#female").attr("checked", true);
      }
      $("#nation").val(localStorage.nation);
      $("#birth-year").val(localStorage.birthYear);
      $("#birth-month").val(localStorage.birthMonth);
      $("#school").val(localStorage.school);
      $("#class").val(localStorage.class);
      $("#fee").val(localStorage.fee);
      $("#watch").val(localStorage.watcher);
      $("#age").val(localStorage.age);
      $("#ID-cardNo").val(localStorage.ID);
      $("#work").val(localStorage.work);
      $("#cellphone").val(localStorage.phone);
      $("#income").val(localStorage.income);
      $("#income").val(localStorage.income);
      $("#pocession").val(localStorage.pocession);
      $("#nowAdress").val(localStorage.nowAddress);
      $("#homeAddress").val(localStorage.homeAddress);
      $("#reason").val(localStorage.reason);
    });
  } 
})();