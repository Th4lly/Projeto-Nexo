// Elementos do modal
const modal = document.querySelector('#appointmentModal');
const modalProfessional = document.querySelector('#modalProfessional');
const modalSpecialty = document.querySelector('#modalSpecialty');
const modalSchedule = document.querySelector('#modalSchedule');
const cards = document.querySelectorAll('.professional-card');

let currentCard = null;
let currentSchedule = null;

// Seleção de horários e abertura do modal
cards.forEach(function (card) {
  const schedules = card.querySelectorAll('.schedule-button');
  const appointment = card.querySelector('.appointment-button');
  const feedback = card.querySelector('.appointment-feedback');

  schedules.forEach(function (schedule) {
    schedule.addEventListener('click', function () {
      schedules.forEach(function (button) {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      });

      schedule.classList.add('active');
      schedule.setAttribute('aria-pressed', 'true');
      feedback.textContent = '';
    });
  });

  appointment.addEventListener('click', function () {
    const selected = card.querySelector('.schedule-button.active');

    if (!selected) {
      feedback.textContent = 'Selecione um horário para continuar.';
      feedback.classList.remove('success');
      return;
    }

    currentCard = card;
    currentSchedule = selected;

    modalProfessional.textContent = card.querySelector('h2').textContent;

    modalSpecialty.textContent = card
      .querySelector('.professional-info p')
      .textContent.split('·')[0].trim();

    modalSchedule.textContent = selected.textContent.trim();

    modal.showModal();
  });
});

// Cancelar agendamento
document.querySelector('#cancelAppointment')
  .addEventListener('click', function () {
    modal.close();
  });

// Confirmar agendamento simulado
document.querySelector('#confirmAppointment')
  .addEventListener('click', function () {
    if (!currentCard || !currentSchedule) return;

    const feedback = currentCard.querySelector('.appointment-feedback');

    feedback.textContent = 'Agendamento simulado confirmado! '
      + currentSchedule.textContent.trim();

    feedback.classList.add('success');

    currentSchedule.classList.remove('active');
    currentSchedule.setAttribute('aria-pressed', 'false');

    modal.close();
  });

// Limpar os dados temporários ao fechar
modal.addEventListener('close', function () {
  currentCard = null;
  currentSchedule = null;
});
