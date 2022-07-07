import mitt from 'mitt'

const eventBus = mitt()
export const useEventBus = () => {
  return {
    Busemit: eventBus.emit,
    Buson: eventBus.on,
    Busoff: eventBus.off
  }
}
