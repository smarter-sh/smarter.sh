/*
 * Figure 2 of the AI coding agents case: the files in Smarter's apps that call cache.get() or cache.set()
 * directly, at each minor release tag, as bars, with the lines that use @cache_results beside them.
 *
 * `rows` are {tag, handRolled, helper}.
 */
const SeriesChart = ({ rows }) => {
  const max = Math.max(...rows.map((row) => row.handRolled))
  return (
    <figure className="my-8 rounded-xl border border-keen-300 bg-white p-5 shadow-card md:p-8">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">
          Hand-rolled cache files and @cache_results lines, by release
        </caption>
        <thead className="text-xs uppercase tracking-wider text-keen-600">
          <tr>
            <th className="w-16 pb-2 font-semibold">Tag</th>
            <th className="pb-2 font-semibold">
              Files with raw cache.get() / cache.set()
            </th>
            <th className="w-24 pb-2 text-right font-semibold">@cache_results</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.tag}>
              <td className="py-1 font-mono text-keen-800">{row.tag}</td>
              <td className="py-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-4 rounded bg-red-400"
                    style={{ width: `${(row.handRolled / max) * 85}%` }}
                  />
                  <span className="tabular-nums text-keen-800">{row.handRolled}</span>
                </div>
              </td>
              <td className="py-1 text-right tabular-nums text-keen-700">{row.helper}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="mt-6 border-t border-keen-200 pt-4 text-sm text-keen-600">
        <strong className="text-keen-800">Figure 2.</strong> Both ways grew at once, from
        v0.14 to v0.20: the signature of the antipattern. The fix of October 11 arrived in
        a v0.20 patch release, so v0.21 is the first minor release without the copies.
        Measured with the command in Lab 2, on October 28, 2026; Part 2’s own count of the
        helper’s lines differs a little, but shows the same shape.
      </figcaption>
    </figure>
  )
}
export default SeriesChart
