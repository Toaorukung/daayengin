const scriptUrl = "https://script.google.com/macros/s/AKfycbzpxdxz3SLEn4gakteDAE5p4r7EfdHEFcZgDEtxUSuhkN4QHSASR3Hd0eSmKJL0XW3H/exec"

$(document).ready(function() {
  fetchAndDisplayData()
})

function fetchAndDisplayData() {
  $.LoadingOverlay('show')
  try {
    $.getJSON(scriptUrl, function(data) {
      listschool(data.data1)

      $.LoadingOverlay('hide')
    }).fail(function(jqxhr, textStatus, error) {
      $.LoadingOverlay('hide')
      let err = textStatus + ", " + error
      console.error("Request Failed: " + err)
    })
  } catch (error) {
    $.LoadingOverlay('hide')
    console.error(error)
  }
}

function listschool(data) {
  data.forEach(function(school) {
    let newOption = $('<option value="' + school[0] + '"></option>')
    $('#schooldata').append(newOption)
  })
}

function save() {
  $.LoadingOverlay('show')
  let data = {
    opt: 'savedata',
    info1: $('#info1').val(),
    info2: $('#info2').val(),
    info3: $('#info3').val(),
    info4: $('#info4').val(),
    info5: $('#info5').val(),
    info6: $('#info6').val(),
    info7: $('#info7').val(),
    info8: $('#info8').val(),
    info9: $('#info9').val() + ' ' + $('#info9qty').val(),
    info10: $('#info10').val(),
    info11: $('#info11').val(),
    info12: $('#info12').val()

  }

  $.ajax({
    method: "POST",
    url: scriptUrl,
    data: data,
    dataType: 'json',
    success: function(res) {
      $.LoadingOverlay('hide')
      if (res.status == 'success') {
        return Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลเสร็จสิ้น',
          allowOutsideClick: false,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          let formData = $("#myForm").serialize()
          formData += '&iddata=เลขที่ ' + res.iddata
          window.location.href = 'index2.html?' + formData
        })
      }
    },
    error: function(err) {
      console.log(err)
      $.LoadingOverlay('hide')
      return Swal.fire({
        icon: 'error',
        title: 'บันทึกข้อมูลไม่สำเร็จ',
        allowOutsideClick: false,
        confirmButtonText: 'ตกลง',
      })
    },
  })
}

(() => {
  'use strict'
  const forms = document.querySelectorAll('.needs-validation')
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      if (!form.checkValidity()) {
        event.stopPropagation()
        form.classList.add('was-validated')
        $('#myForm').find(":invalid").first().focus()
      } else {
        save()
      }

    }, false)
  })
})()