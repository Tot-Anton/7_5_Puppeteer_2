Feature: Booking ticket
    Scenario: buy 1 ticket
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует билет в зале на 4 ряду место 2
        Then Пользователь получил qr

    Scenario: buy 2 ticket
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует билеты в зале на 8 ряду места 5 и 6
        Then Пользователь получил qr

    Scenario: Repeat order
        Given Пользователь находится на странице 'http://qamid.tmweb.ru/client/index.php'
        When Пользователь бронирует билет в зале на 1 ряду место 5, и затем бронирует его повторно.
        Then Пользователь не может забронировать уже забронированное место