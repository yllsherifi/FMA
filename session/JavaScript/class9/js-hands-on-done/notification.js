        let defaultTitle = document.title;
        let faviconElement = document.querySelector('link[rel="icon"]');
        let defaultFavIcon = faviconElement ? faviconElement.href : ''; //ternary operator
        let notificationsInterval;
        let isInDefaultState = true;
        let bellIcon = 'bell.png';

        function startNotification(message) {
            if (notificationsInterval)
                endNotification();
            notificationsInterval = setInterval(() => {
                if (isInDefaultState) {
                    resetToDefaults();
                } else {
                    resetToNotification(message);
                }
                isInDefaultState = !isInDefaultState;
            }, 1000);
        }

        function endNotification() {
            clearInterval(notificationsInterval);
            resetToDefaults();
        }

        function resetToDefaults() {
            document.title = defaultTitle;
            if (faviconElement) faviconElement.href = defaultFavIcon;
        }

        function resetToNotification(message) {
            document.title = message;
            if (faviconElement) faviconElement.href = bellIcon;
        }