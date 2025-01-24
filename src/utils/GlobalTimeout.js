let inactivityTimeout;

export function startInactivityTimeout(router, timeoutDuration = 60000) {
  clearTimeout(inactivityTimeout); 

  inactivityTimeout = setTimeout(() => {
    router.push("/"); 
  }, timeoutDuration);
}

export function resetInactivityTimeout(router, timeoutDuration) {
  startInactivityTimeout(router, timeoutDuration);
}
