const notificationsContainer = document.getElementById('notifications');

let notificationId = 0;
const maxNotifications = 5;
const duration = 5000;
const activeNotifications = new Map();

function showNotification(message, type, header) {
    notificationId++;
    const id = notificationId;
    const headerText = header.toUpperCase();
    

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.id = `notification-${id}`;
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-header">${escapeHtml(headerText)}</span><br/>
            <span class="notification-message">${escapeHtml(message)}</span>
        </div>
        <div class="notification-progress">
            <div class="notification-progress-bar" style="animation-duration: ${duration}ms;"></div>
        </div>
    `;
    

    notificationsContainer.appendChild(notification);
    

    activeNotifications.set(id, {
        element: notification,
        timeout: null
    });
    

    const timeout = setTimeout(() => {
        hideNotification(id);
    }, duration);
    
    activeNotifications.get(id).timeout = timeout;
    
    if(activeNotifications.get(id - maxNotifications))
    {
        hideNotification(id - maxNotifications);
    }
    return id;
}


function hideNotification(id) {
    const notificationData = activeNotifications.get(id);
    if (!notificationData) return;
    
    const { element, timeout } = notificationData;


    if (timeout) {
        clearTimeout(timeout);
    }

    
    element.classList.add('hiding');
    

    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
        activeNotifications.delete(id);
    }, 300);
}


function showInfo(message) {
    return showNotification(message, 'info', 'Informacja');
}


function showSuccess(message) {
    return showNotification(message, 'success', 'Operacja przeszła pomyślnie');
}


function showWarning(message) {
    return showNotification(message, 'warning', 'Ostrzeżenie');
}


function showError(message) {
    return showNotification(message, 'error', 'Błąd');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

if (typeof mp !== 'undefined') {
    mp.events.add('browser:showInfo', (message) => {
        showInfo(message);
    });
    
    mp.events.add('browser:showSuccess', (message) => {
        showSuccess(message);
    });
    
    mp.events.add('browser:showWarning', (message) => {
        showWarning(message);
    });
    
    mp.events.add('browser:showError', (message) => {
        showError(message);
    });
}