import { useTransaction } from "hooks/use-transaction"
import { useEffect } from "react"
import { useCardano } from "use-cardano"

import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const { isValid, hideToaster, showToaster } = useCardano()
  const tx = useTransaction()

  useEffect(() => {
    if (!tx.successMessage) {
      hideToaster
    } else {
      showToaster("Success!", tx.successMessage)
    }
  }, [tx.successMessage, hideToaster, showToaster])

  return (
    <div className="text-center my-4 max-w-4xl m-auto text-gray-900 dark:text-gray-100">
      <h1
        style={inter.style}
        className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl"
      >
        Transact
      </h1>

      <div style={inter.style} className="my-4 text-center">
        Using Lucid, we can easily send transactions on the Cardano blockchain.
      </div>

      <div className="text-left">
        <div className="my-4">
          <label className="flex flex-col w-100">
            <span className="text-sm lowercase">To Account</span>

            <input
              className="rounded py-1 px-2 text-gray-800"
              type="text"
              placeholder="addr..."
              value={tx.toAccount}
              onChange={(e) => tx.setToAccount(e.target.value?.toString())}
            />
          </label>
        </div>

        <div className="my-4">
          <label className="flex flex-col w-40">
            <span className="text-sm lowercase">Lovelace</span>

            <input
              className="rounded py-1 px-2 text-gray-800"
              type="number"
              min="0"
              step="1000"
              name="amount"
              value={tx.lovelace}
              onChange={(e) => tx.setLovelace(e.target.value?.toString())}
            />
          </label>
        </div>

        <div className="my-4">
          <button
            className="border my-4 w-40 px-2 py-1 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-200 rounded bg-white text-gray-800 font-bold uppercase"
            disabled={!tx.canTransact || !!tx.error}
            onClick={tx.sendTransaction}
          >
            Send
          </button>

          <div className="italic">
            {isValid === false ? (
              <p>
                <small>connect a wallet to send a transaction</small>
              </p>
            ) : !tx.successMessage && !tx.error && !tx.canTransact ? (
              <p>
                <small>specify a lovelace amount and account to send a transaction</small>
              </p>
            ) : tx.error ? (
              <p>
                <small>{tx.error.message}</small>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
